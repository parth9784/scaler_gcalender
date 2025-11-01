import axios from 'axios';
import type { Event, CreateEventData, UpdateEventData } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventsAPI = {
  getAll: async (userId?: number): Promise<Event[]> => {
    const params = userId ? { user_id: userId } : {};
    const response = await api.get<Event[]>('/events', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Event> => {
    const response = await api.get<Event>(`/events/${id}`);
    return response.data;
  },

  create: async (data: CreateEventData): Promise<Event> => {
    const response = await api.post<Event>('/events', data);
    return response.data;
  },

  update: async (id: number, data: UpdateEventData): Promise<Event> => {
    const response = await api.put<Event>(`/events/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/events/${id}`);
  },
};
