from ninja.security import HttpBearer
from typing import Optional
from .jwt_utils import get_user_from_token


class JWTAuth(HttpBearer):
    """
    JWT Authentication middleware for Django Ninja
    """

    def authenticate(self, request, token: str) -> Optional[int]:
        """
        Authenticate the request using JWT token
        Returns user_id if valid, None otherwise
        """
        user = get_user_from_token(token)
        if user:
            # Attach user to request for use in endpoints
            request.user = user
            return user.id
        return None
