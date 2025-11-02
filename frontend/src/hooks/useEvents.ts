import { useEffect } from 'react';
import { useEventStore } from '../store/eventStore';
import { eventsAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';
import type { CreateEventData, UpdateEventData } from '../types';
import toast from 'react-hot-toast';

export const useEvents = () => {
  const { isAuthenticated } = useAuthStore();
  const { 
    events, 
    loading, 
    error, 
    setEvents, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
    setLoading, 
    setError 
  } = useEventStore();

  // Fetch all events
  const fetchEvents = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await eventsAPI.getAll();
      setEvents(data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch events';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Create event
  const createEvent = async (data: CreateEventData) => {
    setError(null);
    const loadingToast = toast.loading('Creating event...');
    try {
      const newEvent = await eventsAPI.create(data);
      addEvent(newEvent);
      toast.success('Event created successfully', { id: loadingToast });
      return newEvent;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to create event';
      setError(errorMsg);
      toast.error(errorMsg, { id: loadingToast });
      throw err;
    }
  };

  // Update event
  const updateEventById = async (id: number, data: UpdateEventData) => {
    setError(null);
    const loadingToast = toast.loading('Updating event...');
    try {
      const updated = await eventsAPI.update(id, data);
      updateEvent(id, updated);
      toast.success('Event updated successfully', { id: loadingToast });
      return updated;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to update event';
      setError(errorMsg);
      toast.error(errorMsg, { id: loadingToast });
      throw err;
    }
  };

  // Delete event
  const deleteEventById = async (id: number) => {
    setError(null);
    const loadingToast = toast.loading('Deleting event...');
    try {
      await eventsAPI.delete(id);
      deleteEvent(id);
      toast.success('Event deleted successfully', { id: loadingToast });
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to delete event';
      setError(errorMsg);
      toast.error(errorMsg, { id: loadingToast });
      throw err;
    }
  };

  // Load events on mount or when authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent: updateEventById,
    deleteEvent: deleteEventById,
  };
};
