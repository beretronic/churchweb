from django.urls import path
from .views import SermonListView, EventListView, latest_sermons_from_youtube

urlpatterns = [
    path('sermons/',          SermonListView.as_view(),    name='sermon-list'),
    path('sermons/youtube/',  latest_sermons_from_youtube, name='youtube-sermons'),
    path('events/',           EventListView.as_view(),     name='event-list'),
]