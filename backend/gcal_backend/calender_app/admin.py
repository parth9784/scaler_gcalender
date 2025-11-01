from django.contrib import admin
from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "user",
        "start_time",
        "end_time",
        "all_day",
        "color",
        "created_at",
    )
    list_filter = ("all_day", "user", "created_at", "start_time")
    search_fields = ("title", "description", "user__username")
    readonly_fields = ("created_at", "updated_at")
    date_hierarchy = "start_time"

    fieldsets = (
        ("Event Information", {"fields": ("user", "title", "description", "color")}),
        ("Schedule", {"fields": ("start_time", "end_time", "all_day")}),
        (
            "Metadata",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    list_per_page = 25
    ordering = ("-start_time",)
