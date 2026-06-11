from rest_framework import serializers
from .models import Sermon, Event

class SermonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sermon
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    # Automatically pulls the human-readable text for choice fields (e.g., 'Weekly Service')
    event_type_display = serializers.CharField(source='get_event_type_display', read_only=True)
    
    # Custom fields explicitly requested by your React App.jsx file
    date_time_info = serializers.SerializerMethodField()
    location_info = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'

    def get_date_time_info(self, obj):
        # 1. If your model already has a property/method named 'date_time_info', use it:
        if hasattr(obj, 'date_time_info'):
            return obj.date_time_info
        
        # 2. Otherwise, this safely formats your database fields into text for React:
        date_str = str(obj.date) if hasattr(obj, 'date') else "Upcoming"
        time_str = str(obj.time) if hasattr(obj, 'time') else ""
        return f"{date_str} at {time_str}".strip()

    def get_location_info(self, obj):
        # 1. If your model already has a property/method named 'location_info', use it:
        if hasattr(obj, 'location_info'):
            return obj.location_info
            
        # 2. Otherwise, look for a standard 'location' text column, defaulting to Main Sanctuary:
        return getattr(obj, 'location', 'Main Sanctuary')
