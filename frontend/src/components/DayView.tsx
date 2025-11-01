import React, { useRef, useEffect, useState } from 'react';
import type { Event } from '../types';
import {
  format,
  parseISO,
  startOfDay,
  endOfDay,
  isWithinInterval,
  isSameDay,
} from '../utils/dateUtils';

interface DayViewProps {
  currentDate: Date;
  events: Event[];
  onTimeSlotClick: (hour: number) => void;
  onEventClick: (event: Event) => void;
}

const DayView: React.FC<DayViewProps> = ({
  currentDate,
  events,
  onTimeSlotClick,
  onEventClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Scroll to current time on mount
  useEffect(() => {
    if (scrollRef.current) {
      const currentHour = new Date().getHours();
      const scrollPosition = currentHour * 60;
      scrollRef.current.scrollTop = Math.max(0, scrollPosition - 100);
    }
  }, []);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getEventsForDay = (): Event[] => {
    const dayStart = startOfDay(currentDate);
    const dayEnd = endOfDay(currentDate);

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

  const getEventPosition = (event: Event) => {
    const eventStart = parseISO(event.start_time);
    const eventEnd = parseISO(event.end_time);

    const startHour = eventStart.getHours() + eventStart.getMinutes() / 60;
    const endHour = eventEnd.getHours() + eventEnd.getMinutes() / 60;
    const duration = endHour - startHour;

    return {
      top: `${startHour * 60}px`,
      height: `${Math.max(duration * 60, 30)}px`,
    };
  };

  const isCurrentDay = isSameDay(currentDate, currentTime);

  const getCurrentTimePosition = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return (hours * 60) + minutes;
  };

  const dayEvents = getEventsForDay();

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Day Header */}
      <div className="flex bg-white border-b border-gray-200 elevation-1">
        <div className="w-20 shrink-0 border-r border-gray-200" />
        <div className="flex-1 text-center py-5">
          <div className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">
            {format(currentDate, 'EEEE')}
          </div>
          <div
            className={`text-[40px] font-normal mt-2 leading-none ${
              isSameDay(currentDate, new Date())
                ? 'text-blue-600 font-semibold'
                : 'text-gray-800'
            }`}
          >
            {format(currentDate, 'd')}
          </div>
          <div className="text-sm text-gray-600 mt-2 font-medium">
            {format(currentDate, 'MMMM yyyy')}
          </div>
        </div>
      </div>

      {/* Time Grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="relative">
          {hours.map((hour) => (
            <div key={hour} className="flex h-[60px]">
              {/* Time Label */}
              <div className="w-20 shrink-0 pr-3 text-right border-r border-gray-200">
                <span className="text-[11px] text-gray-500 -mt-2.5 inline-block font-medium">
                  {hour === 0 ? '' : format(new Date().setHours(hour, 0), 'h a')}
                </span>
              </div>

              {/* Day Column */}
              <div
                onClick={() => onTimeSlotClick(hour)}
                className="flex-1 border-t border-gray-100 hover:bg-blue-50/50 cursor-pointer transition-colors relative"
              />
            </div>
          ))}

          {/* Events Overlay */}
          <div className="absolute top-0 left-20 right-0">
            {dayEvents.map((event) => {
              const position = getEventPosition(event);
              const eventStart = parseISO(event.start_time);
              return (
                <div
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                  className="absolute left-2 right-2 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all z-10 event-transparent"
                  style={{
                    top: position.top,
                    height: position.height,
                    backgroundColor: event.color,
                    color: 'white',
                  }}
                >
                  <div className="p-3 h-full flex flex-col">
                    <div className="font-bold text-sm truncate">
                      {event.title}
                    </div>
                    {!event.all_day && (
                      <div className="text-xs opacity-90 mt-1">
                        {format(eventStart, 'h:mm a')} - {format(parseISO(event.end_time), 'h:mm a')}
                      </div>
                    )}
                    {event.description && (
                      <div className="text-xs opacity-80 mt-2 line-clamp-3">
                        {event.description}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Current Time Indicator */}
          {isCurrentDay && (
            <div
              className="absolute left-0 right-0 z-20 pointer-events-none"
              style={{ top: `${getCurrentTimePosition()}px` }}
            >
              <div className="flex items-center">
                <div className="w-20 shrink-0 pr-3 text-right">
                  <span className="text-[11px] text-red-500 font-semibold">
                    {format(currentTime, 'h:mm a')}
                  </span>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full current-time-dot shadow-md" />
                  <div className="flex-1 h-0.5 bg-red-500 shadow-sm" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayView;
