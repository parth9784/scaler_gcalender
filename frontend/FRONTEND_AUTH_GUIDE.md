# Frontend Authentication & Event Management Guide

## Overview
This frontend implementation uses:
- **Zustand** for state management (auth & events)
- **Axios** for API calls with automatic token injection
- **React Hooks** for simplified data fetching
- **TypeScript** for type safety
- **localStorage** for persistent auth state

## Architecture

### 1. **State Management**

#### Auth Store (`src/store/authStore.ts`)
```typescript
const { user, token, isAuthenticated, setAuth, logout } = useAuthStore();
```
- Stores user info and JWT token
- Persists to localStorage automatically
- Provides auth state across the app

#### Event Store (`src/store/eventStore.ts`)
```typescript
const { events, loading, error, setEvents, addEvent, updateEvent, deleteEvent } = useEventStore();
```
- Stores all events
- Manages loading and error states
- Updates in real-time

### 2. **API Layer** (`src/services/api.ts`)

**Automatic Token Injection:**
```typescript
// All requests automatically include: Authorization: Bearer <token>
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Auto Logout on 401:**
```typescript
// Automatically logs out user if token expires
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
```

### 3. **Custom Hooks**

#### useAuth Hook (`src/hooks/useAuth.ts`)
```typescript
const { user, isAuthenticated, loading, error, signup, login, logout } = useAuth();

// Usage
await signup({ username, email, password });
await login({ username, password });
await logout();
```

#### useEvents Hook (`src/hooks/useEvents.ts`)
```typescript
const { events, loading, error, fetchEvents, createEvent, updateEvent, deleteEvent } = useEvents();

// Auto-fetches events on mount
// Usage
await createEvent({ title, start_time, end_time, event_type, color });
await updateEvent(id, { title: 'Updated' });
await deleteEvent(id);
```

## Usage Examples

### App.tsx Integration

```typescript
import { useAuthStore } from './store/authStore';
import { useEvents } from './hooks/useEvents';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const { isAuthenticated } = useAuthStore();
  const { events, loading, createEvent, deleteEvent } = useEvents();
  const [showLogin, setShowLogin] = useState(true);

  // Show login/signup if not authenticated
  if (!isAuthenticated) {
    return showLogin ? (
      <Login 
        onSuccess={() => {/* Navigate to calendar */}}
        onSwitchToSignup={() => setShowLogin(false)}
      />
    ) : (
      <Signup 
        onSuccess={() => {/* Navigate to calendar */}}
        onSwitchToLogin={() => setShowLogin(true)}
      />
    );
  }

  // Show calendar if authenticated
  return (
    <CalendarApp 
      events={events}
      onCreateEvent={createEvent}
      onDeleteEvent={deleteEvent}
    />
  );
}
```

### Creating Events

```typescript
const handleCreateEvent = async () => {
  try {
    await createEvent({
      title: 'Team Meeting',
      description: 'Discuss Q4 goals',
      start_time: '2025-11-05T10:00:00Z',
      end_time: '2025-11-05T11:00:00Z',
      all_day: false,
      event_type: 'event', // 'event' | 'task' | 'reminder'
      color: '#4285F4'
    });
    // Event is automatically added to the store
  } catch (error) {
    console.error('Failed to create event:', error);
  }
};
```

### Updating Events

```typescript
const handleUpdateEvent = async (eventId: number) => {
  try {
    await updateEvent(eventId, {
      title: 'Updated Title',
      event_type: 'task',
    });
    // Event is automatically updated in the store
  } catch (error) {
    console.error('Failed to update event:', error);
  }
};
```

### Deleting Events

```typescript
const handleDeleteEvent = async (eventId: number) => {
  try {
    await deleteEvent(eventId);
    // Event is automatically removed from the store
  } catch (error) {
    console.error('Failed to delete event:', error);
  }
};
```

### Logout

```typescript
import { useAuth } from './hooks/useAuth';

const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
  // User is automatically logged out and redirected
};
```

## Type Definitions

### Event Types
```typescript
type EventType = 'event' | 'task' | 'reminder';

interface Event {
  id: number;
  title: string;
  description?: string;
  start_time: string; // ISO 8601 format
  end_time: string;
  all_day: boolean;
  event_type: EventType;
  color: string;
}
```

### Auth Types
```typescript
interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

interface LoginData {
  username: string;
  password: string;
}
```

## Key Features

✅ **Automatic Token Management**
- Token stored in localStorage
- Auto-injected in all API requests
- Persists across page refreshes

✅ **Auto Logout on Token Expiry**
- Detects 401 responses
- Clears auth state automatically
- Redirects to login

✅ **Optimistic Updates**
- Events update immediately in UI
- Store updated before API response
- Rollback on error (if implemented)

✅ **Error Handling**
- All errors caught and stored
- Display friendly error messages
- Automatic retry logic (optional)

✅ **Loading States**
- Global loading indicator
- Per-operation loading states
- Skeleton screens (optional)

## Best Practices

1. **Always use hooks** - Don't call API directly
2. **Check isAuthenticated** - Before rendering protected routes
3. **Handle errors gracefully** - Show user-friendly messages
4. **Use TypeScript types** - For type safety
5. **Keep stores simple** - No complex logic in stores
6. **Use interceptors** - For global request/response handling

## Troubleshooting

### Token not being sent
- Check if user is logged in: `useAuthStore().isAuthenticated`
- Verify token exists: `useAuthStore().token`
- Check browser console for request headers

### 401 Unauthorized
- Token expired (10 days)
- User logged out automatically
- Re-login required

### Events not loading
- Check if user is authenticated
- Verify backend is running on `localhost:8000`
- Check browser console for errors
- Verify CORS is enabled on backend
