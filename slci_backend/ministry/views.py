import xml.etree.ElementTree as ET
import requests
from django.core.cache import cache
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Sermon, Event
from .serializers import SermonSerializer, EventSerializer


# ─── Django Model Views ───────────────────────────────────────────────────────

class SermonListView(generics.ListAPIView):
    queryset = Sermon.objects.all()
    serializer_class = SermonSerializer


class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


# ─── YouTube RSS Feed (No API Key Required) ───────────────────────────────────

CHANNEL_ID  = 'UCDQnjKioeHI6venlMA1LqHw'  # Spirit Life Church International
RSS_URL     = f'https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}'

# XML namespaces used in YouTube RSS
NS = {
    'atom':   'http://www.w3.org/2005/Atom',
    'media':  'http://search.yahoo.com/mrss/',
    'yt':     'http://www.youtube.com/xml/schemas/2015',
}


@api_view(['GET'])
def latest_sermons_from_youtube(request):
    # 1. Return cached response if still fresh (30 min)
    cache_key = 'yt_rss_sermons'
    cached = cache.get(cache_key)
    if cached:
        return Response(cached)

    # 2. Fetch the public RSS feed
    try:
        resp = requests.get(RSS_URL, timeout=10)
        resp.raise_for_status()
    except requests.exceptions.Timeout:
        return Response(
            {'error': 'YouTube RSS feed timed out. Try again shortly.'},
            status=status.HTTP_504_GATEWAY_TIMEOUT
        )
    except requests.exceptions.RequestException as e:
        return Response(
            {'error': f'Could not reach YouTube RSS feed: {str(e)}'},
            status=status.HTTP_502_BAD_GATEWAY
        )

    # 3. Parse the XML
    try:
        root = ET.fromstring(resp.content)
    except ET.ParseError as e:
        return Response(
            {'error': f'Failed to parse RSS feed: {str(e)}'},
            status=status.HTTP_502_BAD_GATEWAY
        )

    # 4. Extract latest 6 videos
    videos = []
    entries = root.findall('atom:entry', NS)[:6]

    for entry in entries:
        video_id = entry.findtext('yt:videoId', default='', namespaces=NS)
        title    = entry.findtext('atom:title', default='', namespaces=NS)
        published = entry.findtext('atom:published', default='', namespaces=NS)

        # Description lives inside media:group > media:description
        media_group = entry.find('media:group', NS)
        description = ''
        thumbnail   = ''
        if media_group is not None:
            description = media_group.findtext('media:description', default='', namespaces=NS)
            media_thumb = media_group.find('media:thumbnail', NS)
            if media_thumb is not None:
                thumbnail = media_thumb.get('url', '')

        # Fallback thumbnail from standard YouTube URL pattern
        if not thumbnail and video_id:
            thumbnail = f'https://i.ytimg.com/vi/{video_id}/hqdefault.jpg'

        if not video_id:
            continue

        videos.append({
            'id':           video_id,
            'title':        title,
            'description':  description[:200],  # trim long descriptions
            'thumbnail':    thumbnail,
            'published_at': published,
            'video_url':    f'https://www.youtube.com/watch?v={video_id}',
            'embed_url':    f'https://www.youtube.com/embed/{video_id}',
            'series':       'Latest Sermon',
        })

    # 5. Cache for 30 minutes and return
    cache.set(cache_key, videos, 60 * 30)
    return Response(videos)