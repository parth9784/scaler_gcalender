import { useEffect } from 'react';
import { useEventStore } from '../store/eventStore';
import { eventsAPI } from '../services/api';
import type { CreateEventData, UpdateEventData } from '../types';

export const useEvents = () => {
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
    setLoading(true);
    setError(null);
    try {
      const data = await eventsAPI.getAll();
      setEvents(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  // Create event
  const createEvent = async (data: CreateEventData) => {
    setLoading(true);
    setError(null);
    try {
      const newEvent = await eventsAPI.create(data);
      addEvent(newEvent);
      return newEvent;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create event');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update event
  const updateEventById = async (id: number, data: UpdateEventData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await eventsAPI.update(id, data);
      updateEvent(id, updated);
      return updated;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update event');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete event
  const deleteEventById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await eventsAPI.delete(id);
      deleteEvent(id);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete event');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

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
