import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.models import User
from typing import Optional


# Secret key for JWT (you should use settings.SECRET_KEY in production)
JWT_SECRET = settings.SECRET_KEY
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_DAYS = 10


def create_access_token(user_id: int) -> dict:
    """
    Create a JWT access token for a user
    Returns dict with token and expiration info
    """
    expiration = datetime.utcnow() + timedelta(days=JWT_EXPIRATION_DAYS)

    payload = {
        "user_id": user_id,
        "exp": expiration,
        "iat": datetime.utcnow(),
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return {
        "access_token": token,
        "token_type": "Bearer",
        "expires_in": JWT_EXPIRATION_DAYS * 24 * 60 * 60,  # in seconds
    }


def decode_access_token(token: str) -> Optional[dict]:
    """
    Decode and verify a JWT token
    Returns the payload if valid, None otherwise
    """
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def get_user_from_token(token: str) -> Optional[User]:
    """
    Get user object from JWT token
    Returns User instance if valid, None otherwise
    """
    payload = decode_access_token(token)
    if not payload:
        return None

    user_id = payload.get("user_id")
    if not user_id:
        return None

    try:
        user = User.objects.get(id=user_id)
        return user
    except User.DoesNotExist:
        return None
