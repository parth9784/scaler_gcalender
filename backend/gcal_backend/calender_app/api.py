from ninja import NinjaAPI
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from typing import Optional
from .schema import EventSchema, CreateEventSchema, UpdateEventSchema
from .models import Event

api = NinjaAPI()


@api.get("/events", response=list[EventSchema])
def list_events(request, user_id: Optional[int] = None):
    """Get all events, optionally filtered by user_id"""
    queryset = Event.objects.all()
    if user_id is not None:
        queryset = queryset.filter(user_id=user_id)
    return queryset.order_by("start_time")


@api.get("/events/{event_id}", response=EventSchema)
def get_event(request, event_id: int):
    """Get a specific event by ID"""
    event = get_object_or_404(Event, id=event_id)
    return event


@api.post("/events", response=EventSchema)
def create_event(request, data: CreateEventSchema):
    """Create a new event"""
    # Get or create a default user if not authenticated
    user = request.user if request.user.is_authenticated else User.objects.first()

    if not user:
        # Create a default user if none exists
        user = User.objects.create_user(
            username="default_user", password="default_pass"
        )

    event = Event.objects.create(
        user=user,
        title=data.title,
        description=data.description or "",
        start_time=data.start_time,
        end_time=data.end_time,
        all_day=data.all_day,
        color=data.color,
    )
    return event


@api.put("/events/{event_id}", response=EventSchema)
def update_event(request, event_id: int, data: UpdateEventSchema):
    """Update an existing event (partial update supported)"""
    event = get_object_or_404(Event, id=event_id)

    # Only update fields that are provided
    update_data = data.dict(exclude_unset=True)
    for attr, value in update_data.items():
        setattr(event, attr, value)

    event.save()
    return event


@api.delete("/events/{event_id}")
def delete_event(request, event_id: int):
    """Delete an event"""
    event = get_object_or_404(Event, id=event_id)
    event.delete()
    return {"success": True, "message": f"Event '{event.title}' deleted successfully"}
