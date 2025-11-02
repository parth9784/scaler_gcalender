# Google Calendar Clone - Fullstack Application

A production-ready, full-featured calendar application with authentication, event management, and real-time updates. Built with React, TypeScript, Django, and PostgreSQL.

🌐 **Live Demo**: [https://scaler-gcalender.vercel.app/](https://scaler-gcalender.vercel.app/)

## 🚀 Features

### 🔐 Authentication & User Management
- **JWT Authentication**: Secure token-based authentication with 10-day expiration
- **User Registration**: Complete signup flow with email validation
- **User Login**: Secure login with password encryption
- **Protected Routes**: Auto-redirect to login for unauthenticated users
- **Auto Logout**: Token expiry handling with automatic logout
- **Profile Management**: User profile with logout functionality
- **Persistent Sessions**: localStorage-based session persistence

### 📅 Calendar Views
- **Month View**: Traditional monthly calendar with event previews
  - Mobile-optimized: Events hidden on mobile, blue dot indicators with counts
  - Desktop: Full event display with truncation for long titles
- **Week View**: Detailed week view with hourly time slots
  - Precise event positioning based on start/end times
  - Current time indicator (red line)
- **Day View**: Focused single-day view with hour-by-hour breakdown
  - Vertical timeline with current time tracking
  - Easy time slot selection

### 📝 Event Management
- **Event Types**: Support for Events, Tasks, and Reminders
  - Visual differentiation with color-coded badges
  - Filterable by type in sidebar
- **Create Events**: Click any date or time slot to create
  - Smart date/time initialization
  - Event type selector (Event/Task/Reminder)
  - Color picker with 24+ colors
  - All-day event toggle
- **Edit Events**: Click existing events to modify
  - Pre-populated form with existing data
  - Date/time validation
- **Delete Events**: Remove events with confirmation dialog
- **Event Validation**: 
  - End date/time cannot be before start date/time
  - Browser-level date restrictions
  - Form-level validation with error messages
- **Real-time Updates**: 
  - Optimistic UI updates
  - Background API operations
  - Toast notifications for all actions

### 🎨 UI/UX Features
- **Modern Design**: Clean, Google Calendar-inspired interface
- **Smooth Animations**: 
  - Fade-in effects for modals
  - Slide transitions for sidebar
  - Hover effects throughout
- **Toast Notifications**: 
  - Loading states ("Creating event...")
  - Success messages with checkmarks
  - Error handling with clear messages
  - Auto-dismiss with configurable duration
- **Current Time Indicator**: Real-time red line in Week/Day views
- **Today Highlighting**: Blue background on current day
- **Responsive Design**: 
  - Mobile-first approach
  - Collapsible sidebar
  - Touch-friendly controls
  - Adaptive layouts for all screen sizes
- **Interactive Elements**:
  - Color picker with preview
  - Date/time pickers with validation
  - Checkbox filters for event types
  - Keyboard navigation support

### 🔍 Advanced Features
- **Event Filtering**: Filter by Event/Task/Reminder types
- **User Isolation**: Users only see their own events
- **State Management**: Zustand for efficient state handling
- **Error Boundaries**: Graceful error handling
- **Loading States**: Visual feedback for all async operations
- **Optimistic Updates**: Instant UI feedback before API confirmation

## 🛠️ Technology Stack

### Frontend
- **React 19** with TypeScript for type safety
- **Vite** for lightning-fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **Zustand** for state management (with persist middleware)
- **Axios** for HTTP requests with interceptors
- **date-fns** for date manipulation
- **react-hot-toast** for beautiful notifications
- **Lucide React** for modern icons

### Backend
- **Django 5.2.7** web framework
- **Django Ninja** for modern REST API
- **PostgreSQL** database (production-ready)
- **PyJWT** for token generation and validation
- **django-cors-headers** for CORS handling
- **Python 3.x** runtime

### DevOps & Deployment
- **Vercel** for frontend hosting
- **Git** for version control
- **Environment Variables** for configuration

## 📦 Project Structure

```
gcal/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.tsx           # Navigation and view controls
│   │   │   ├── Sidebar.tsx          # Mini calendar and filters
│   │   │   ├── MonthView.tsx        # Monthly calendar grid
│   │   │   ├── WeekView.tsx         # Weekly time-based view
│   │   │   ├── DayView.tsx          # Single day view
│   │   │   ├── EventModal.tsx       # Event creation/editing
│   │   │   ├── Login.tsx            # Login form
│   │   │   └── Signup.tsx           # Registration form
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useAuth.ts           # Authentication logic
│   │   │   └── useEvents.ts         # Event CRUD operations
│   │   ├── services/        # API layer
│   │   │   └── api.ts               # Axios instance & endpoints
│   │   ├── store/           # State management
│   │   │   ├── authStore.ts         # User authentication state
│   │   │   ├── eventStore.ts        # Events state
│   │   │   └── appstate.ts          # UI state & filters
│   │   ├── types/           # TypeScript definitions
│   │   │   └── index.ts             # Type declarations
│   │   ├── utils/           # Helper functions
│   │   │   └── dateUtils.ts         # Date manipulation
│   │   ├── App.tsx          # Main application component
│   │   └── main.tsx         # Application entry point
│   ├── package.json
│   └── vite.config.ts
│
└── backend/                  # Django backend
    └── gcal_backend/
        ├── calender_app/            # Main application
        │   ├── models.py            # Database models
        │   ├── schema.py            # API schemas
        │   ├── api.py               # API endpoints
        │   ├── auth_schema.py       # Auth schemas
        │   ├── auth_api.py          # Auth endpoints
        │   ├── auth_middleware.py   # JWT middleware
        │   └── jwt_utils.py         # Token utilities
        ├── gcal_backend/
        │   ├── settings.py          # Django settings
        │   └── urls.py              # URL routing
        └── manage.py
```

## 🚀 Setup and Installation

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.8+
- **PostgreSQL** (or SQLite for development)
- **Git**

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend/gcal_backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   ```bash
   # Windows (PowerShell)
   .\venv\Scripts\Activate.ps1
   
   # Windows (Command Prompt)
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install django==5.2.7 django-ninja PyJWT==2.10.1 django-cors-headers psycopg2-binary
   ```

5. **Configure database (settings.py):**
   ```python
   # For PostgreSQL (production)
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'your_db_name',
           'USER': 'your_db_user',
           'PASSWORD': 'your_db_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   
   # For SQLite (development)
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.sqlite3',
           'NAME': BASE_DIR / 'db.sqlite3',
       }
   }
   ```

6. **Set up JWT secret key (settings.py):**
   ```python
   JWT_SECRET_KEY = 'your-super-secret-key-change-in-production'
   JWT_ALGORITHM = 'HS256'
   JWT_EXPIRATION_DAYS = 10
   ```

7. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

8. **Create a superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

9. **Start the development server:**
   ```bash
   python manage.py runserver
   ```
   
   The backend API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API endpoint (optional):**
   
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:5173/`

5. **Build for production:**
   ```bash
   npm run build
   ```

## 🔌 API Endpoints

### Authentication

- **POST** `/api/auth/signup` - Register a new user
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

- **POST** `/api/auth/login` - Authenticate user
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
  Response:
  ```json
  {
    "token": "jwt_token_string",
    "user": {
      "id": 1,
      "username": "string",
      "email": "string"
    }
  }
  ```

- **POST** `/api/auth/logout` - Logout user (requires authentication)

### Events

All event endpoints require authentication via JWT token in `Authorization` header.

- **GET** `/api/events` - Get all events for authenticated user
- **GET** `/api/events/{event_id}` - Get a specific event
- **POST** `/api/events` - Create a new event
  ```json
  {
    "title": "string",
    "description": "string (optional)",
    "start_time": "2024-01-15T10:00:00",
    "end_time": "2024-01-15T11:00:00",
    "all_day": false,
    "color": "#3b82f6",
    "event_type": "event" // "event" | "task" | "reminder"
  }
  ```
- **PUT** `/api/events/{event_id}` - Update an event
- **DELETE** `/api/events/{event_id}` - Delete an event

### Event Schema

```typescript
interface Event {
  id: number;
  title: string;
  description?: string;
  start_time: string;  // ISO 8601 datetime
  end_time: string;    // ISO 8601 datetime
  all_day: boolean;
  color: string;       // Hex color code
  event_type: 'event' | 'task' | 'reminder';
  user: number;        // User ID (auto-assigned)
}
```

## 🏗️ Architecture & Technology Choices

### Frontend Architecture

#### Component Hierarchy
```
App.tsx (Root)
├── AuthWrapper (Route Protection)
│   ├── Login.tsx
│   └── Signup.tsx
├── MainLayout (Authenticated)
│   ├── Header.tsx (Navigation & User Info)
│   ├── Sidebar.tsx (Event Type Filters)
│   └── Calendar Views
│       ├── MonthView.tsx (Default View)
│       ├── WeekView.tsx
│       └── DayView.tsx
└── EventModal.tsx (Create/Edit Events)
```

#### State Management Philosophy

**Why Zustand over Redux?**
- Minimal boilerplate
- Built-in TypeScript support
- Simple persist middleware for localStorage
- No provider wrapper needed

**Store Structure:**
1. **authStore**: Manages authentication state
   - Persisted to localStorage for session persistence
   - Auto-logout on token expiration
   
2. **eventStore**: Manages event CRUD operations
   - Optimistic updates for better UX
   - Background syncing with API
   
3. **appState**: UI state and filters
   - Sidebar collapse state
   - Event type filters (persisted)
   - Current view mode

#### API Layer Design

**Axios Interceptors Approach:**
- **Request Interceptor**: Auto-inject JWT token from authStore
- **Response Interceptor**: 
  - Handle 401 errors → auto-logout
  - Clear event data on logout
  - Global error handling

This centralized approach ensures:
- No manual token management in components
- Consistent authentication flow
- Automatic cleanup on session expiry

### Backend Architecture

#### Django Ninja Choice

**Why Django Ninja over Django REST Framework?**
- FastAPI-style syntax (modern, intuitive)
- Automatic OpenAPI/Swagger documentation
- Pydantic schema validation
- Better performance
- Type hints throughout

#### Authentication Flow

```
1. User submits credentials → /api/auth/login
2. Backend validates → Creates JWT token (HS256, 10-day expiry)
3. Token returned to client → Stored in localStorage
4. Client includes token in Authorization header (Bearer <token>)
5. JWTAuth middleware validates on protected endpoints
6. User data attached to request object
```

**Security Considerations:**
- Passwords hashed with Django's PBKDF2 (default)
- JWT tokens expire after 10 days
- CORS configured to allow only trusted origins
- User data isolation (events filtered by user ID)

#### Data Model Design

```python
class Event(models.Model):
    user = ForeignKey(User)  # User isolation
    title = CharField(max_length=255)
    description = TextField(blank=True)
    start_time = DateTimeField()
    end_time = DateTimeField()
    all_day = BooleanField(default=False)
    color = CharField(max_length=7, default='#3b82f6')
    event_type = CharField(
        max_length=10,
        choices=[('event', 'Event'), ('task', 'Task'), ('reminder', 'Reminder')],
        default='event'
    )
```

**Design Decisions:**
- `user` ForeignKey ensures data isolation
- `event_type` allows filtering without separate tables
- `color` stored as hex for flexibility
- `all_day` boolean simplifies time handling

## 🧠 Business Logic & Edge Cases

### Event Filtering Logic

**Date Comparison Strategy:**
```typescript
// Uses date-fns for reliable date comparisons
const getEventsForDay = (date: Date, events: Event[]) => {
  return events.filter(event => {
    const eventDate = parseISO(event.start_time);
    return isSameDay(eventDate, date);
  });
};
```

**Why direct comparison over `isWithinInterval`?**
- Fixed bug where events showed on every date
- More accurate for single-day events
- Better performance (simpler check)

### Date/Time Validation

**Multi-layered Validation:**

1. **Browser-level (HTML5):**
   ```typescript
   <input 
     type="datetime-local"
     min={startTime}  // End date can't be before start
   />
   ```

2. **Form-level (JavaScript):**
   ```typescript
   if (new Date(endTime) < new Date(startTime)) {
     toast.error('End time cannot be before start time');
     return;
   }
   ```

3. **Backend-level (Django):**
   ```python
   if event.end_time < event.start_time:
       raise ValueError("End time must be after start time")
   ```

**Edge Cases Handled:**
- Same-day events (start = end time)
- All-day events (time ignored, full-day blocks)
- Multi-day events (show on start date in month view)
- Timezone handling (stored as UTC, displayed in local time)

### Event Type Filtering

**Filter State Management:**
```typescript
// Persisted to localStorage
const eventTypeFilters = {
  event: true,     // Default: all enabled
  task: true,
  reminder: true
};

// Filtered using useMemo for performance
const filteredEvents = useMemo(() => {
  return events.filter(event => 
    eventTypeFilters[event.event_type]
  );
}, [events, eventTypeFilters]);
```

**Why useMemo?**
- Prevents re-filtering on every render
- Performance optimization for large event lists
- Only recalculates when dependencies change

### Optimistic UI Updates

**Pattern Used:**
```typescript
const deleteEvent = async (id: number) => {
  const toastId = toast.loading('Deleting event...');
  
  // Optimistically remove from UI
  set(state => ({
    events: state.events.filter(e => e.id !== id)
  }));
  
  try {
    await api.delete(`/events/${id}`);
    toast.success('Event deleted', { id: toastId });
  } catch (error) {
    // Revert on error
    fetchEvents();
    toast.error('Failed to delete', { id: toastId });
  }
};
```

**Benefits:**
- Instant UI feedback
- No loading spinners blocking interactions
- Background API calls
- Error recovery with refetch

### Concurrent Update Handling

**Current Limitation:**
- No optimistic locking
- Last write wins
- No conflict resolution UI

**Future Enhancement:**
- Add `updated_at` timestamp
- Version-based conflict detection
- Prompt user to refresh on conflicts

## 🎨 Animations & Interactions

### Modal Transitions

**Implementation:**
```typescript
// EventModal.tsx
<div className={`
  fixed inset-0 bg-black/50 flex items-center justify-center z-50
  transition-opacity duration-200
  ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
`}>
  <div className={`
    bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4
    transform transition-all duration-200
    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
  `}>
    {/* Modal content */}
  </div>
</div>
```

**Animation Details:**
- Backdrop fade-in: 200ms opacity transition
- Modal scale + fade: Starts at 95% scale, grows to 100%
- Staggered effect: Backdrop fades first, then modal scales
- Smooth exit: Reverse animation on close

### Toast Notifications

**Configuration:**
```typescript
// App.tsx
<Toaster
  position="top-center"
  toastOptions={{
    duration: 3000,
    style: {
      background: '#fff',
      color: '#363636',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    success: {
      iconTheme: {
        primary: '#10b981',
        secondary: '#fff',
      },
    },
    error: {
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    },
  }}
/>
```

**Loading State Pattern:**
```typescript
// Creates toast, returns ID
const toastId = toast.loading('Creating event...');

try {
  // ... API call
  // Updates existing toast (smooth transition)
  toast.success('Event created!', { id: toastId });
} catch {
  toast.error('Failed to create', { id: toastId });
}
```

**Why ID-based updates?**
- No duplicate toasts
- Smooth status transitions (loading → success/error)
- Better UX than dismissing + creating new toast

### Sidebar Collapse Animation

```typescript
// Sidebar.tsx
<div className={`
  bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
  ${isCollapsed ? 'w-16' : 'w-64'}
`}>
  {/* Content with opacity transitions */}
</div>
```

**Features:**
- Width transition: 300ms ease-in-out
- Content fade: Checkboxes/labels fade out on collapse
- Icon rotation: Toggle button rotates 180°
- Responsive: Auto-collapse on mobile

### Hover Effects

**Event Cards:**
```css
/* Subtle shadow + scale on hover */
.event-card {
  @apply transition-all duration-150 hover:shadow-md hover:scale-[1.02];
}
```

**Buttons:**
```css
/* Color transitions + transform */
.btn-primary {
  @apply transition-colors duration-200 hover:bg-blue-600;
}
```

### Mobile Optimization Animations

**Month View - Event Count Badges:**
```typescript
// Shows count with blue dot indicator
<div className="flex items-center gap-1">
  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
  <span className="text-xs">{eventCount}</span>
</div>
```

**Why dots instead of full events?**
- Prevents mobile clutter
- Tap day → Opens day view with full events
- Matches Google Calendar mobile pattern

## 🚀 Future Enhancements

### High Priority

1. **Recurring Events**
   - Daily, weekly, monthly, yearly patterns
   - Custom recurrence rules (RRULE support)
   - Edit single vs. all occurrences
   - Exception dates handling

2. **Drag & Drop Event Moving**
   - React DnD or react-beautiful-dnd
   - Visual feedback during drag
   - Time slot snapping
   - Multi-day event support

3. **Event Reminders/Notifications**
   - Browser notifications API
   - Customizable reminder times (5m, 15m, 1h, 1d before)
   - Email reminders (backend integration)
   - Push notifications (PWA)

### Medium Priority

4. **Calendar Sharing**
   - Share calendar with other users (read-only or edit)
   - Public calendar links
   - Shared event comments/notes
   - Permission management

5. **Import/Export**
   - ICS file import (Google Calendar, Outlook)
   - ICS export for backup
   - Sync with Google Calendar API
   - Bulk import from CSV

6. **Multi-Timezone Support**
   - User timezone preference
   - Display events in local time
   - Timezone picker for events
   - Handle DST transitions

### Low Priority

7. **Advanced Filtering**
   - Search events by title/description
   - Filter by date range
   - Filter by color/category
   - Saved filter presets

8. **Event Categories/Tags**
   - Custom categories beyond event/task/reminder
   - Color-coded categories
   - Multiple tags per event
   - Category-based filtering

9. **Attachments**
   - File uploads for events
   - Image attachments
   - Link attachments
   - Cloud storage integration (Google Drive, Dropbox)

10. **Collaborative Features**
    - Event invites (send to users)
    - RSVP system
    - Event comments/chat
    - @mentions in descriptions

### Technical Improvements

11. **Performance Optimizations**
    - Virtual scrolling for large event lists
    - Lazy loading for calendar views
    - Service worker caching
    - Optimistic concurrency control

12. **Testing**
    - Unit tests (Jest + React Testing Library)
    - E2E tests (Playwright/Cypress)
    - Backend API tests
    - Visual regression tests

13. **Accessibility**
    - Keyboard navigation (arrow keys for date navigation)
    - Screen reader support (ARIA labels)
    - Focus management in modals
    - High contrast mode

14. **Progressive Web App (PWA)**
    - Offline support
    - Install as app
    - Background sync
    - Push notifications

## 📝 Development Notes

### Known Limitations

- No real-time updates (requires WebSocket implementation)
- Events stored in user's local timezone (no UTC conversion)
- No conflict detection for concurrent edits
- Limited to single calendar per user
- No undo/redo functionality

### Contributing

Contributions are welcome! Areas that need attention:
- Recurring events implementation
- Performance optimization for 1000+ events
- Accessibility improvements
- Mobile app (React Native version)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspired by Google Calendar
- Built with modern web technologies
- Deployed on Vercel for optimal performance

---

**Live Demo:** [https://scaler-gcalender.vercel.app/](https://scaler-gcalender.vercel.app/)
- **Visual Hierarchy**: Clear date headers, time indicators, and event cards
- **Color Psychology**: 12 distinct colors for event categorization
- **Responsive Grid**: CSS Grid for calendar layout
- **Smooth Interactions**: Transitions and hover effects for better UX

### Technical Choices
- **date-fns over moment.js**: Lighter weight, tree-shakeable, immutable
- **Django Ninja over DRF**: Faster, type-safe, OpenAPI documentation
- **Tailwind CSS**: Utility-first for rapid UI development
- **Vite**: Lightning-fast HMR and build times

## 🔍 Business Logic & Edge Cases

### Event Overlap
- Multiple events can exist at the same time
- Week/Day views stack events visually
- Month view shows up to 3 events, then "+X more"

### Date Handling
- All times stored in ISO 8601 format
- Timezone-aware (uses browser's local timezone)
- All-day events span midnight to midnight

### Event Creation
- Default 1-hour duration for new events
- Smart time slot selection (clicking hour creates event at that time)
- Color defaults to Google Calendar blue (#4285F4)

### Validation
- End time must be after start time (frontend validation)
- Title is required
- Description is optional

### Performance
- Events filtered client-side for current view
- Efficient date calculations using date-fns
- Minimal re-renders with React state management

## 🚧 Future Enhancements

### Features
- [ ] Recurring events (daily, weekly, monthly)
- [ ] Event reminders and notifications
- [ ] Multiple calendars support
- [ ] Event search and filtering
- [ ] Drag-and-drop event rescheduling
- [ ] Event invitation and sharing
- [ ] Calendar export (iCal format)
- [ ] User authentication and authorization
- [ ] Time zone support

### Technical Improvements
- [ ] Backend pagination for large event sets
- [ ] WebSocket for real-time updates
- [ ] Service workers for offline support
- [ ] Unit and integration tests
- [ ] E2E tests with Playwright
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Performance monitoring

### UI/UX
- [ ] Dark mode
- [ ] Mobile responsive views
- [ ] Keyboard shortcuts
- [ ] Accessibility improvements (ARIA labels)
- [ ] Print view
- [ ] Event templates

## 🐛 Known Limitations

- No user authentication (uses default user)
- No recurring events support
- Events don't handle timezone conversions
- No conflict detection for overlapping events
- Month view limits to 3 visible events per day

## 🤝 Development Notes

### Code Quality
- TypeScript strict mode enabled
- ESLint configured for React best practices
- Consistent code formatting
- Component composition patterns
- Semantic HTML

### API Design
- RESTful principles
- Consistent error handling
- Proper HTTP status codes
- Type-safe request/response schemas

## 📄 License

This project is created for educational purposes as part of a technical assessment.

## 👨‍💻 Author

Created as part of a fullstack development assignment.

---

**Note**: This is a demonstration project showcasing fullstack development skills with React, TypeScript, Django, and modern web technologies.
