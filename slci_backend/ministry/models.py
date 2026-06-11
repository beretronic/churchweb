from django.db import models
from django.utils.text import slugify
from django.urls import reverse

class Sermon(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True, help_text="Auto-generated from title")
    series = models.CharField(max_length=255, default="Standalone Activation")
    description = models.TextField(blank=True)
    video_url = models.URLField(unique=True, help_text="Link to YouTube or video stream")
    published_at = models.DateTimeField(null=True, blank=True, help_text="Original YouTube publish date")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-published_at', '-created_at']
        verbose_name = "Sermon"
        verbose_name_plural = "Sermons"

    def __str__(self):
        return f"{self.title} | {self.series}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('sermon_detail', kwargs={'slug': self.slug})

class Event(models.Model):
    EVENT_TYPES = [
        ('weekly', 'Weekly Celebration'),
        ('midweek', 'Mid-Week Prayer'),
        ('special', 'Special Conference'),
    ]
    title = models.CharField(max_length=255)
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES, default='weekly')
    description = models.TextField()
    date_time_info = models.CharField(max_length=100, help_text="e.g., Sundays at 09:00 AM")
    location_info = models.CharField(max_length=100, help_text="e.g., Main Sanctuary & Online")

    class Meta:
        verbose_name = "Church Event"
        verbose_name_plural = "Church Events"

    def __str__(self):
        return self.title




