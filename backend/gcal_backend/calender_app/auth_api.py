from ninja import Router
from ninja.errors import HttpError
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db import IntegrityError
from .auth_schema import (
    SignupSchema,
    LoginSchema,
    AuthResponseSchema,
    MessageSchema,
)
from .jwt_utils import create_access_token

auth_router = Router()


@auth_router.post(
    "/signup", response={201: AuthResponseSchema, 400: MessageSchema, 422: dict}
)
def signup(request, data: SignupSchema):
    """
    Register a new user
    """
    try:
        # Validate required fields
        if not data.username or not data.email or not data.password:
            return 400, {"message": "Username, email, and password are required"}

        # Validate email format (basic check)
        if "@" not in data.email:
            return 400, {"message": "Invalid email format"}

        # Validate password length
        if len(data.password) < 6:
            return 400, {"message": "Password must be at least 6 characters long"}

        # Check if username already exists
        if User.objects.filter(username=data.username).exists():
            return 400, {"message": "Username already exists"}

        # Check if email already exists
        if User.objects.filter(email=data.email).exists():
            return 400, {"message": "Email already exists"}

        # Create new user
        user = User.objects.create_user(
            username=data.username,
            email=data.email,
            password=data.password,
            first_name=data.first_name or "",
            last_name=data.last_name or "",
        )

        # Generate JWT token
        token_data = create_access_token(user.id)

        # Return user and token
        return 201, {
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            },
            "token": token_data,
        }

    except IntegrityError:
        return 400, {"message": "User already exists"}
    except Exception as e:
        return 400, {"message": f"Error creating user: {str(e)}"}


@auth_router.post(
    "/login", response={200: AuthResponseSchema, 401: MessageSchema, 422: dict}
)
def login(request, data: LoginSchema):
    """
    Login user and return JWT token
    """
    try:
        # Validate required fields
        if not data.username or not data.password:
            return 401, {"message": "Username and password are required"}

        # Authenticate user
        user = authenticate(username=data.username, password=data.password)

        if not user:
            return 401, {"message": "Invalid username or password"}

        # Generate JWT token
        token_data = create_access_token(user.id)

        # Return user and token
        return 200, {
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            },
            "token": token_data,
        }
    except Exception as e:
        return 401, {"message": f"Authentication failed: {str(e)}"}


@auth_router.post("/logout", response=MessageSchema)
def logout(request):
    """
    Logout user (client-side should delete the token)
    """
    return {
        "message": "Logged out successfully. Please delete the token on client side."
    }
