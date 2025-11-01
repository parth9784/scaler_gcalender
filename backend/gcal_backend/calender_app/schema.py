from ninja import Schema
from datetime import datetime
from typing import Optional, Literal


class EventSchema(Schema):
    id: int
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    all_day: bool
    event_type: Literal["event", "task", "reminder"]
    color: str


class CreateEventSchema(Schema):
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    all_day: bool = False
    event_type: Literal["event", "task", "reminder"] = "event"
    color: str = "#4285F4"


class UpdateEventSchema(Schema):
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    all_day: Optional[bool] = None
    event_type: Optional[Literal["event", "task", "reminder"]] = None
    color: Optional[str] = None
