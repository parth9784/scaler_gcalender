# Google Calendar Clone - Authentication Setup

## Authentication System

This backend implements JWT (JSON Web Token) authentication with the following features:

### Features
- User signup and login
- JWT tokens that expire in 10 days
- Secure middleware to verify token authenticity
- User-specific event management (users can only access their own events)

### API Endpoints

#### Authentication Endpoints (No auth required)

**POST /api/auth/signup**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe"
}
```
Response:
```json
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "token": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 864000
  }
}
```

**POST /api/auth/login**
```json
{
  "username": "john_doe",
  "password": "securepassword123"
}
```
Response: Same as signup

**POST /api/auth/logout**
Response:
```json
{
  "message": "Logged out successfully. Please delete the token on client side."
}
```

#### Event Endpoints (JWT Auth Required)

All event endpoints require the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

**GET /api/events**
- Returns all events for the authenticated user

**GET /api/events/{event_id}**
- Returns specific event (only if it belongs to the user)

**POST /api/events**
- Creates a new event for the authenticated user

**PUT /api/events/{event_id}**
- Updates an event (only if it belongs to the user)

**DELETE /api/events/{event_id}**
- Deletes an event (only if it belongs to the user)

### Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

3. Start the server:
```bash
python manage.py runserver
```

### How JWT Authentication Works

1. **Signup/Login**: User provides credentials and receives a JWT token
2. **Token Storage**: Frontend stores the token (localStorage/sessionStorage)
3. **Authenticated Requests**: Frontend includes token in Authorization header
4. **Token Verification**: Backend middleware verifies token and extracts user
5. **User-Specific Data**: API returns only data belonging to the authenticated user

### Token Details
- **Algorithm**: HS256
- **Expiration**: 10 days (864000 seconds)
- **Secret**: Uses Django's SECRET_KEY
- **Format**: Bearer token in Authorization header

### Security Features
- Passwords are hashed using Django's built-in password hashing
- JWT tokens are signed and verified
- Users can only access their own events
- Token expiration is enforced
- CORS is configured for frontend access

### Frontend Integration

Example JavaScript code for authentication:

```javascript
// Signup
const signup = async (userData) => {
  const response = await fetch('http://localhost:8000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  localStorage.setItem('token', data.token.access_token);
  return data;
};

// Login
const login = async (credentials) => {
  const response = await fetch('http://localhost:8000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  localStorage.setItem('token', data.token.access_token);
  return data;
};

// Get events (authenticated)
const getEvents = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8000/api/events', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

// Create event (authenticated)
const createEvent = async (eventData) => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8000/api/events', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });
  return response.json();
};
```

### Testing with cURL

```bash
# Signup
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'

# Get events (replace TOKEN with actual token)
curl -X GET http://localhost:8000/api/events \
  -H "Authorization: Bearer TOKEN"

# Create event (replace TOKEN with actual token)
curl -X POST http://localhost:8000/api/events \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Meeting",
    "description":"Team meeting",
    "start_time":"2025-11-05T10:00:00Z",
    "end_time":"2025-11-05T11:00:00Z",
    "all_day":false,
    "color":"#4285F4"
  }'
```

### Error Handling

- **401 Unauthorized**: Invalid or expired token
- **400 Bad Request**: Invalid data or user already exists
- **404 Not Found**: Event not found or doesn't belong to user
