from django.contrib import admin
from .models import Sermon, Event

@admin.register(Sermon)
class SermonAdmin(admin.ModelAdmin):
    list_display = ('title', 'series', 'created_at')
    search_fields = ('title', 'series', 'description')
    list_filter = ('series', 'created_at')
    readonly_fields = ('created_at', 'slug')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_type', 'date_time_info', 'location_info')
    search_fields = ('title', 'description', 'location_info')
    list_filter = ('event_type',)


