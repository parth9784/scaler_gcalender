import React from 'react';
import type { Event } from '../types';
import {
  getMonthDays,
  isSameMonth,
  isToday,
  format,
  parseISO,
  startOfDay,
  endOfDay,
  isWithinInterval,
} from '../utils/dateUtils';

interface MonthViewProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const days = getMonthDays(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDay = (date: Date): Event[] => {
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    return events.filter((event) => {
      const eventStart = parseISO(event.start_time);
      const eventEnd = parseISO(event.end_time);

      return (
        isWithinInterval(eventStart, { start: dayStart, end: dayEnd }) ||
        isWithinInterval(dayEnd, { start: dayStart, end: dayEnd }) ||
        (eventStart <= dayStart && eventEnd >= dayEnd)
      );
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Week Day Headers */}
      <div className="grid grid-cols-7 bg-white border-b border-gray-200">
        {weekDays.map((day) => (
          <div
            key={day}
            className="px-3 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide border-r last:border-r-0 border-gray-200"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 grid-rows-5 lg:grid-rows-6 overflow-auto">
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentToday = isToday(day);

          return (
            <div
              key={index}
              onClick={() => onDateClick(day)}
              className={`calendar-day relative border-r border-b border-gray-200 p-2 min-h-[140px] cursor-pointer transition-all ${
                !isCurrentMonth ? 'bg-gray-50/50' : 'bg-white'
              }`}
            >
              {/* Date Number */}
              <div className="flex items-center justify-center mb-1.5">
                <span
                  className={`flex items-center justify-center w-7 h-7 text-sm rounded-full transition-all ${
                    isCurrentToday
                      ? 'bg-blue-600 text-white font-bold shadow-md'
                      : isCurrentMonth
                      ? 'text-gray-800 font-medium hover:bg-gray-100'
                      : 'text-gray-400 font-normal'
                  }`}
                >
                  {format(day, 'd')}
                </span>
              </div>

              {/* Events - Hidden on mobile, visible on desktop */}
              <div className="space-y-0.5 overflow-y-auto max-h-[calc(100%-2.5rem)] hidden md:block">
                {dayEvents.slice(0, 3).map((event) => {
                  const eventStart = parseISO(event.start_time);
                  const timeText = event.all_day
                    ? ''
                    : format(eventStart, 'h:mm a');

                  return (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className="event-card group px-2 py-1 rounded text-xs truncate cursor-pointer event-transparent"
                      style={{
                        backgroundColor: event.color,
                        color: 'white',
                      }}
                    >
                      <div className="font-medium truncate">
                        {timeText && <span className="opacity-90 text-[10px]">{timeText}</span>}
                        {timeText && ' '}
                        {event.title}
                      </div>
                    </div>
                  );
                })}
                {dayEvents.length > 3 && (
                  <button className="text-[11px] text-blue-600 hover:text-blue-700 font-medium pl-1.5 pt-0.5 hover:underline">
                    +{dayEvents.length - 3} more
                  </button>
                )}
              </div>

              {/* Event count indicator for mobile */}
              {dayEvents.length > 0 && (
                <div className="md:hidden flex justify-center items-center mt-1">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  {dayEvents.length > 1 && (
                    <span className="ml-1 text-[10px] text-gray-600 font-medium">
                      {dayEvents.length}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
