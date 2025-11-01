import { create } from 'zustand';
import type { Event } from '../types';

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
  updateEvent: (id: number, event: Event) => void;
  deleteEvent: (id: number) => void;
  clearEvents: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  loading: false,
  error: null,
  
  setEvents: (events) => set({ events, error: null }),
  
  addEvent: (event) => set((state) => ({ 
    events: [...state.events, event] 
  })),
  
  updateEvent: (id, event) => set((state) => ({
    events: state.events.map((e) => e.id === id ? event : e)
  })),
  
  deleteEvent: (id) => set((state) => ({
    events: state.events.filter((e) => e.id !== id)
  })),
  
  clearEvents: () => set({ events: [], error: null }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
}));
