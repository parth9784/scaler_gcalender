from django.db import models
from django.contrib.auth.models import User


class Event(models.Model):
    EVENT_TYPE_CHOICES = [
        ("event", "Event"),
        ("task", "Task"),
        ("reminder", "Reminder"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    all_day = models.BooleanField(default=False)
    event_type = models.CharField(
        max_length=10, choices=EVENT_TYPE_CHOICES, default="event"
    )
    color = models.CharField(max_length=20, default="#4285F4")  # Google Calendar blue
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["start_time"]
        indexes = [
            models.Index(fields=["start_time"]),
            models.Index(fields=["user", "start_time"]),
        ]

    def __str__(self):
        return f"{self.title} ({self.start_time} - {self.end_time})"
