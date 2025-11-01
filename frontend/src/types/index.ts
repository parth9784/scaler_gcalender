export interface Event {
  id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  all_day: boolean;
  color: string;
}

export interface CreateEventData {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  all_day?: boolean;
  color?: string;
}

export interface UpdateEventData {
  title?: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  all_day?: boolean;
  color?: string;
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
  { name: 'Lavender', value: '#7986CB' },
  { name: 'Grape', value: '#8E24AA' },
  { name: 'Graphite', value: '#616161' },
  { name: 'Default', value: '#4285F4' },
];
