// Event types
export type EventType = 'event' | 'task' | 'reminder';

export interface Event {
  id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  all_day: boolean;
  event_type: EventType;
  color: string;
}

export interface CreateEventData {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  all_day?: boolean;
  event_type?: EventType;
  color?: string;
}

export interface UpdateEventData {
  title?: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  all_day?: boolean;
  event_type?: EventType;
  color?: string;
}

// Auth types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthResponse {
  user: User;
  token: Token;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export type ViewType = 'month' | 'week' | 'day';

export const GOOGLE_CALENDAR_COLORS = [
  { name: 'Tomato', value: '#D50000' },
  { name: 'Flamingo', value: '#E67C73' },
  { name: 'Tangerine', value: '#F4511E' },
  { name: 'Banana', value: '#F6BF26' },
  { name: 'Sage', value: '#33B679' },
  { name: 'Basil', value: '#0B8043' },
  { name: 'Peacock', value: '#039BE5' },
  { name: 'Blueberry', value: '#3F51B5' },
];
