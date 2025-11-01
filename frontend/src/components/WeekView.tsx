import React, { useRef, useEffect, useState } from 'react';
import type { Event } from '../types';
import {
  getWeekDays,
  format,
  parseISO,
  startOfDay,
  endOfDay,
  isWithinInterval,
  isSameDay,
} from '../utils/dateUtils';

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onTimeSlotClick: (date: Date, hour: number) => void;
  onEventClick: (event: Event) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onTimeSlotClick,
  onEventClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const weekDays = getWeekDays(currentDate);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Scroll to current time on mount
  useEffect(() => {
    if (scrollRef.current) {
      const currentHour = new Date().getHours();
      const scrollPosition = currentHour * 60; // 60px per hour
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

  const isCurrentTimeLine = (day: Date) => {
    return isSameDay(day, currentTime);
  };

  const getCurrentTimePosition = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return (hours * 60) + minutes;
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Day Headers */}
      <div className="flex bg-white border-b border-gray-200 elevation-1">
        <div className="w-20 shrink-0 border-r border-gray-200" />
        {weekDays.map((day, index) => {
          const isToday = isSameDay(day, new Date());
          return (
            <div
              key={index}
              className="flex-1 text-center py-4 border-r last:border-r-0 border-gray-200"
            >
              <div className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">
                {format(day, 'EEE')}
              </div>
              <div
                className={`text-[26px] font-normal mt-1 ${
                  isToday ? 'text-blue-600 font-semibold' : 'text-gray-800'
                }`}
              >
                {format(day, 'd')}
              </div>
            </div>
          );
        })}
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

              {/* Day Columns */}
              {weekDays.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  onClick={() => onTimeSlotClick(day, hour)}
                  className="flex-1 border-r last:border-r-0 border-t border-gray-100 hover:bg-blue-50/50 cursor-pointer transition-colors relative"
                />
              ))}
            </div>
          ))}

          {/* Events Overlay */}
          {weekDays.map((day, dayIndex) => {
            const dayEvents = getEventsForDay(day);
            return (
              <div
                key={dayIndex}
                className="absolute top-0 pointer-events-none"
                style={{
                  left: `${80 + (dayIndex * (100 / 7))}px`,
                  width: `calc(${100 / 7}% - ${dayIndex === 0 ? 80 : 0}px)`,
                }}
              >
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
                      className="absolute left-1 right-1 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all z-10 pointer-events-auto event-transparent"
                      style={{
                        top: position.top,
                        height: position.height,
                        backgroundColor: event.color,
                        color: 'white',
                      }}
                    >
                      <div className="p-1.5 h-full overflow-hidden">
                        <div className="text-xs font-semibold truncate">{event.title}</div>
                        {!event.all_day && (
                          <div className="text-[10px] opacity-90 mt-0.5">
                            {format(eventStart, 'h:mm a')}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Current Time Indicator */}
          {weekDays.map((day, dayIndex) => {
            if (!isCurrentTimeLine(day)) return null;
            const position = getCurrentTimePosition();
            return (
              <div
                key={`time-${dayIndex}`}
                className="absolute z-20 pointer-events-none"
                style={{
                  top: `${position}px`,
                  left: `${80 + (dayIndex * (100 / 7))}px`,
                  width: `calc(${100 / 7}% - ${dayIndex === 0 ? 80 : 0}px)`,
                }}
              >
                <div className="relative">
                  <div className="absolute w-3 h-3 bg-red-500 rounded-full -left-1.5 -top-1.5 current-time-dot shadow-md" />
                  <div className="h-0.5 bg-red-500 shadow-sm" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
