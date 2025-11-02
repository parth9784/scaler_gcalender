from ninja import NinjaAPI
from ninja.errors import ValidationError
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .schema import EventSchema, CreateEventSchema, UpdateEventSchema
from .models import Event
from .auth_middleware import JWTAuth
from .auth_api import auth_router

api = NinjaAPI()


# Custom validation error handler
@api.exception_handler(ValidationError)
def validation_errors(request, exc):
    """
    Handle Pydantic validation errors and return proper JSON response
    """
    return JsonResponse(
        {"detail": "Validation error", "errors": exc.errors}, status=422
    )


# Add authentication router (no auth required)
api.add_router("/auth", auth_router)


@api.get("/events", response=list[EventSchema], auth=JWTAuth())
def list_events(request):
    """Get all events for the authenticated user"""
    # request.user is set by JWTAuth middleware
    queryset = Event.objects.filter(user=request.user)
    return queryset.order_by("start_time")


@api.get("/events/{event_id}", response=EventSchema, auth=JWTAuth())
def get_event(request, event_id: int):
    """Get a specific event by ID (only user's own events)"""
    event = get_object_or_404(Event, id=event_id, user=request.user)
    return event


@api.post("/events", response=EventSchema, auth=JWTAuth())
def create_event(request, data: CreateEventSchema):
    """Create a new event for the authenticated user"""
    event = Event.objects.create(
        user=request.user,
        title=data.title,
        description=data.description or "",
        start_time=data.start_time,
        end_time=data.end_time,
        all_day=data.all_day,
        event_type=data.event_type,
        color=data.color,
    )
    return event


@api.put("/events/{event_id}", response=EventSchema, auth=JWTAuth())
def update_event(request, event_id: int, data: UpdateEventSchema):
    """Update an existing event (only user's own events)"""
    event = get_object_or_404(Event, id=event_id, user=request.user)

    # Only update fields that are provided
    update_data = data.dict(exclude_unset=True)
    for attr, value in update_data.items():
        setattr(event, attr, value)

    event.save()
    return event


@api.delete("/events/{event_id}", auth=JWTAuth())
def delete_event(request, event_id: int):
    """Delete an event (only user's own events)"""
    event = get_object_or_404(Event, id=event_id, user=request.user)
    event.delete()
    return {"success": True, "message": f"Event '{event.title}' deleted successfully"}
