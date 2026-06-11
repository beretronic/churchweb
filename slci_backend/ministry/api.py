from rest_framework import viewsets
from .models import Sermon, Event
from .serializers import SermonSerializer, EventSerializer

class SermonViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows latest sermons to be viewed by the React frontend.
    """
    queryset = Sermon.objects.all().order_by('-created_at')[:3]  # Fetches the latest 3 sermons
    serializer_class = SermonSerializer

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows upcoming church events to be viewed by the React frontend.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer



