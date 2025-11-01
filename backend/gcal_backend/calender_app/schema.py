from ninja import Schema
from datetime import datetime
from typing import Optional


class EventSchema(Schema):
    id: int
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    all_day: bool
    color: str


class CreateEventSchema(Schema):
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    all_day: bool = False
    color: str = "#4285F4"


class UpdateEventSchema(Schema):
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    all_day: Optional[bool] = None
    color: Optional[str] = None
