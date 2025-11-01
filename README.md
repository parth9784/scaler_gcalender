# Google Calendar Clone - Fullstack Application

A high-fidelity clone of Google Calendar with a modern, responsive frontend and robust Django backend.

## 🚀 Features

### Calendar Views
- **Month View**: Traditional monthly calendar with event previews
- **Week View**: Detailed week view with time slots and event positioning
- **Day View**: Focused single-day view with precise time management

### Event Management
- **Create Events**: Click any date or time slot to create a new event
- **Edit Events**: Click on existing events to modify details
- **Delete Events**: Remove events with confirmation
- **All-Day Events**: Support for all-day and timed events
- **Color Coding**: 12 Google Calendar color themes
- **Event Details**: Title, description, start/end times

### UI/UX Features
- **Smooth Animations**: Fade-in effects and transitions
- **Current Time Indicator**: Real-time red line showing current time
- **Today Highlighting**: Visual emphasis on current day
- **Responsive Design**: Works on desktop and tablet devices
- **Interactive**: Hover effects, smooth scrolling, and intuitive controls

## 🛠️ Technology Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for fast development and building
- **date-fns** for date manipulation
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Django** web framework
- **Django Ninja** for REST API
- **SQLite** database (easily swappable)
- **Python 3.x**

## 📦 Project Structure

```
gcal/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── api/             # API client layer
│   │   ├── components/      # React components
│   │   │   ├── Header.tsx
│   │   │   ├── MonthView.tsx
│   │   │   ├── WeekView.tsx
│   │   │   ├── DayView.tsx
│   │   │   └── EventModal.tsx
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # App entry point
│   └── package.json
│
└── backend/                 # Django backend
    └── gcal_backend/
        ├── calender_app/    # Calendar Django app
        │   ├── models.py    # Event model
        │   ├── api.py       # API endpoints
        │   └── schema.py    # Pydantic schemas
        ├── gcal_backend/    # Django project settings
        └── manage.py
```

## 🏃‍♂️ Setup and Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend/gcal_backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install django django-ninja
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

7. Start the development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173/`

## 🔌 API Endpoints

### Events API

- `GET /api/events` - Get all events (optional query param: `user_id`)
- `GET /api/events/{event_id}` - Get a specific event
- `POST /api/events` - Create a new event
- `PUT /api/events/{event_id}` - Update an event
- `DELETE /api/events/{event_id}` - Delete an event

### Event Schema

```typescript
{
  id: number;
  title: string;
  description?: string;
  start_time: string;  // ISO 8601 datetime
  end_time: string;    // ISO 8601 datetime
  all_day: boolean;
  color: string;       // Hex color code
}
```

## 🎨 Design Decisions

### Architecture
- **Component-Based**: Modular React components for maintainability
- **Type Safety**: Full TypeScript implementation
- **Separation of Concerns**: API layer, business logic, and UI are separated
- **RESTful API**: Clean Django Ninja REST endpoints

### UI/UX
- **Google Calendar Inspiration**: Closely follows Google Calendar's design language
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
