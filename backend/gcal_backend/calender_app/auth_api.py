from ninja import Router
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


@auth_router.post("/signup", response={201: AuthResponseSchema, 400: MessageSchema})
def signup(request, data: SignupSchema):
    """
    Register a new user
    """
    try:
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
            },
            "token": token_data,
        }

    except IntegrityError:
        return 400, {"message": "User already exists"}
    except Exception as e:
        return 400, {"message": f"Error creating user: {str(e)}"}


@auth_router.post("/login", response={200: AuthResponseSchema, 401: MessageSchema})
def login(request, data: LoginSchema):
    """
    Login user and return JWT token
    """
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


@auth_router.post("/logout", response=MessageSchema)
def logout(request):
    """
    Logout user (client-side should delete the token)
    """
    return {
        "message": "Logged out successfully. Please delete the token on client side."
    }
