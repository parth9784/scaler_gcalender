import axios from 'axios';
import type { 
  Event, 
  CreateEventData, 
  UpdateEventData, 
  SignupData, 
  LoginData, 
  AuthResponse 
} from '../types';
import { useAuthStore } from '../store/authStore';
import { useEventStore } from '../store/eventStore';

// const API_BASE_URL = 'http://localhost:8000/api';
const API_BASE_URL = 'https://scaler-gcalender.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to all requests automatically
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, logout user and clear events
      useAuthStore.getState().logout();
      useEventStore.getState().clearEvents();
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    // Clear events from store when logging out
    useEventStore.getState().clearEvents();
  },
};

// Events API
export const eventsAPI = {
  getAll: async (): Promise<Event[]> => {
    const response = await api.get<Event[]>('/events');
    return response.data;
  },

  getOne: async (id: number): Promise<Event> => {
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

export default api;
