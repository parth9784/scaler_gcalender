import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MonthView from './components/MonthView';
import WeekView from './components/WeekView';
import DayView from './components/DayView';
import EventModal from './components/EventModal';
import { eventsAPI } from './api/events';
import type { Event, ViewType, CreateEventData, UpdateEventData } from './types';
import { Loader } from 'lucide-react';
import {
  addMonths,
  addWeeks,
  addDays,
  subMonths,
  subWeeks,
  subDays,
  setHours,
  setMinutes,
} from './utils/dateUtils';

function App() {
  const [currentDate,
  setCurrentDate]=useState(new Date());
  const [view,
  setView]=useState<ViewType>('month');
  const [events,
  setEvents]=useState<Event[]>([]);
  const [isModalOpen,
  setIsModalOpen]=useState(false);
  const [selectedEvent,
  setSelectedEvent]=useState<Event | null>(null);
  const [selectedDate,
  setSelectedDate]=useState<Date | undefined>(undefined);
  const [loading,
  setLoading]=useState(false);
  const [error,
  setError]=useState<string | null>(null);

  // Fetch events on mount
  useEffect(()=> {
      fetchEvents();
    }

    , []);

  const fetchEvents=async ()=> {
    try {
      setLoading(true);
      setError(null);
      const data=await eventsAPI.getAll();
      setEvents(data);
    }

    catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please make sure the backend is running.');
    }

    finally {
      setLoading(false);
    }
  }

  ;

  const handleNavigate=(direction: 'prev'| 'next'| 'today')=> {
    if (direction==='today') {
      setCurrentDate(new Date());
      return;
    }

    const increment=direction==='next'? 1 : -1;

    switch (view) {
      case 'month':
        setCurrentDate(increment > 0 ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
      break;
      case 'week':
        setCurrentDate(increment > 0 ? addWeeks(currentDate, 1) : subWeeks(currentDate, 1));
      break;
      case 'day':
        setCurrentDate(increment > 0 ? addDays(currentDate, 1) : subDays(currentDate, 1));
      break;
    }
  }

  ;

  const handleCreateEvent=(date?: Date)=> {
    setSelectedEvent(null);
    setSelectedDate(date || currentDate);
    setIsModalOpen(true);
  }

  ;

  const handleEditEvent=(event: Event)=> {
    setSelectedEvent(event);
    setSelectedDate(undefined);
    setIsModalOpen(true);
  }

  ;

  const handleSaveEvent=async (data: CreateEventData | UpdateEventData)=> {
    try {
      if (selectedEvent) {
        // Update existing event
        const updated=await eventsAPI.update(selectedEvent.id, data as UpdateEventData);
        setEvents(events.map((e)=> (e.id===updated.id ? updated : e)));
      }

      else {
        // Create new event
        const created=await eventsAPI.create(data as CreateEventData);
        setEvents([...events, created]);
      }

      setIsModalOpen(false);
    }

    catch (err) {
      console.error('Error saving event:', err);
      alert('Failed to save event. Please try again.');
    }
  }

  ;

  const handleDeleteEvent=async ()=> {
    if ( !selectedEvent) return;

    if ( !confirm('Are you sure you want to delete this event?')) return;

    try {
      await eventsAPI.delete(selectedEvent.id);
      setEvents(events.filter((e)=> e.id !==selectedEvent.id));
      setIsModalOpen(false);
    }

    catch (err) {
      console.error('Error deleting event:', err);
      alert('Failed to delete event. Please try again.');
    }
  }

  ;

  const handleDateClick=(date: Date)=> {
    handleCreateEvent(date);
  }

  ;

  const handleTimeSlotClick=(date: Date, hour: number)=> {
    const dateWithTime=setMinutes(setHours(date, hour), 0);
    handleCreateEvent(dateWithTime);
  }

  ;

  const handleDayTimeSlotClick=(hour: number)=> {
    const dateWithTime=setMinutes(setHours(currentDate, hour), 0);
    handleCreateEvent(dateWithTime);
  }

  ;

  return (
    <div className="h-screen flex flex-col bg-white ::-webkit-scrollbar">
      <Header
        currentDate={currentDate}
        view={view}
        onViewChange={setView}
        onNavigate={handleNavigate}
        onCreateEvent={() => handleCreateEvent()}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentDate={currentDate}
          onDateSelect={(date) => {
            setCurrentDate(date);
            setView('day');
          }}
          onCreateClick={() => handleCreateEvent()}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex flex-1 items-center justify-center">
  <div className="flex flex-col items-center justify-center text-center space-y-3">
    <Loader className="h-8 w-8 animate-spin text-blue-600" />
  </div>
</div>

          ) : (
            <>
              {view === 'month' && (
                <MonthView
                  currentDate={currentDate}
                  events={events}
                  onDateClick={handleDateClick}
                  onEventClick={handleEditEvent}
                />
              )}
              {view === 'week' && (
                <WeekView
                  currentDate={currentDate}
                  events={events}
                  onTimeSlotClick={handleTimeSlotClick}
                  onEventClick={handleEditEvent}
                />
              )}
              {view === 'day' && (
                <DayView
                  currentDate={currentDate}
                  events={events}
                  onTimeSlotClick={handleDayTimeSlotClick}
                  onEventClick={handleEditEvent}
                />
              )}
            </>
          )}
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={selectedEvent ? handleDeleteEvent : undefined}
        event={selectedEvent}
        initialDate={selectedDate}
      />

    </div>
  );
}

export default App;