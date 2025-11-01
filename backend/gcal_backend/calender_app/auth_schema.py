from ninja import Schema
from typing import Optional


class SignupSchema(Schema):
    username: str
    email: str
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class LoginSchema(Schema):
    username: str
    password: str


class TokenSchema(Schema):
    access_token: str
    token_type: str = "Bearer"
    expires_in: int  # seconds


class UserSchema(Schema):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str


class AuthResponseSchema(Schema):
    user: UserSchema
    token: TokenSchema


class MessageSchema(Schema):
    message: str
