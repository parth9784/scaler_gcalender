import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  addWeeks,
  subMonths,
  subWeeks,
  subDays,
  isSameMonth,
  isSameDay,
  isToday,
  startOfDay,
  endOfDay,
  parseISO,
  isBefore,
  isAfter,
  isWithinInterval,
  addMinutes,
  setHours,
  setMinutes,
} from 'date-fns';

export const getMonthDays = (date: Date): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days: Date[] = [];
  let day = calendarStart;

  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  return days;
};

export const getWeekDays = (date: Date): Date[] => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  const days: Date[] = [];

  for (let i = 0; i < 7; i++) {
    days.push(addDays(weekStart, i));
  }

  return days;
};

export const getHourSlots = (): string[] => {
  const hours: string[] = [];
  for (let i = 0; i < 24; i++) {
    hours.push(`${i.toString().padStart(2, '0')}:00`);
  }
  return hours;
};

export const formatTime = (date: Date): string => {
  return format(date, 'h:mm a');
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};

export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};

export const formatWeekRange = (date: Date): string => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
  return `${format(weekStart, 'MMM d')} – ${format(weekEnd, 'MMM d, yyyy')}`;
};

export const formatDayHeader = (date: Date): string => {
  return format(date, 'EEEE, MMMM d, yyyy');
};

export {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  addWeeks,
  subMonths,
  subWeeks,
  subDays,
  isSameMonth,
  isSameDay,
  isToday,
  startOfDay,
  endOfDay,
  parseISO,
  isBefore,
  isAfter,
  isWithinInterval,
  addMinutes,
  setHours,
  setMinutes,
};
