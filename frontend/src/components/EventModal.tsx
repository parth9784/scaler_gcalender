import React, { useState, useEffect } from 'react';
import { X, Trash2, Clock, AlignLeft, Palette, Check, Calendar, CheckSquare, Bell } from 'lucide-react';
import type { Event, CreateEventData, UpdateEventData } from '../types';
import { GOOGLE_CALENDAR_COLORS } from '../types';
import { format, parseISO } from 'date-fns';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateEventData | UpdateEventData) => void;
  onDelete?: () => void;
  event?: Event | null;
  initialDate?: Date;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen, 
  onClose,
  onSave,
  onDelete,
  event,
  initialDate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [color, setColor] = useState('#4285F4');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [eventType, setEventType] = useState<'event' | 'task' | 'reminder'>('event');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || '');
      const start = parseISO(event.start_time);
      const end = parseISO(event.end_time);
      setStartDate(format(start, 'yyyy-MM-dd'));
      setStartTime(format(start, 'HH:mm'));
      setEndDate(format(end, 'yyyy-MM-dd'));
      setEndTime(format(end, 'HH:mm'));
      setAllDay(event.all_day);
      setColor(event.color);
    } else if (initialDate) {
      const dateStr = format(initialDate, 'yyyy-MM-dd');
      setStartDate(dateStr);
      setEndDate(dateStr);
      setStartTime('09:00');
      setEndTime('10:00');
      setColor('#4285F4');
    }
  }, [event, initialDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDateTime = allDay
      ? `${startDate}T00:00:00`
      : `${startDate}T${startTime}:00`;
    const endDateTime = allDay
      ? `${endDate}T23:59:59`
      : `${endDate}T${endTime}:00`;

    const eventData: CreateEventData | UpdateEventData = {
      title,
      description: description || undefined,
      start_time: startDateTime,
      end_time: endDateTime,
      all_day: allDay,
      color,
    };

    onSave(eventData);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setAllDay(false);
    setColor('#4285F4');
    setShowColorPicker(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-all duration-200"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl z-10">
          <div className="flex items-center space-x-3">
            <div
              className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-gray-200"
              style={{ backgroundColor: color }}
            />
            <h2 className="text-lg font-semibold text-gray-900">
              {event ? 'Edit Event' : 'New Event'}
            </h2>
          </div>
          <button
            title="Close"
            onClick={handleClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Title */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title"
              className="w-full text-xl font-medium border-0 border-b-2 border-gray-200 focus:border-blue-600 outline-none pb-2 placeholder-gray-400 transition-colors"
              required
              autoFocus
            />
          </div>

          {/* Event Type Selector */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setEventType('event')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                eventType === 'event'
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Event</span>
            </button>
            <button
              type="button"
              onClick={() => setEventType('task')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                eventType === 'task'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Task</span>
            </button>
            <button
              type="button"
              onClick={() => setEventType('reminder')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                eventType === 'reminder'
                  ? 'bg-purple-100 text-purple-700 border border-purple-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Reminder</span>
            </button>
          </div>

          {/* Date and Time */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-gray-500 mt-2.5 shrink-0" />
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-600">
                    Start
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    required
                    aria-label="Start date"
                  />
                  {!allDay && (
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      required
                      aria-label="Start time"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-600">
                    End
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    required
                    aria-label="End date"
                  />
                  {!allDay && (
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      required
                      aria-label="End time"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* All Day Toggle */}
            <div className="flex items-center space-x-2 ml-8">
              <input
                type="checkbox"
                id="allDay"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-600 cursor-pointer"
              />
              <label htmlFor="allDay" className="text-sm text-gray-700 cursor-pointer">
                All day
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start space-x-3">
            <AlignLeft className="w-5 h-5 text-gray-500 mt-2.5 shrink-0" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description"
              rows={3}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none transition-all"
            />
          </div>

          {/* Color Picker */}
          <div className="flex items-center space-x-3">
            <Palette className="w-5 h-5 text-gray-500 shrink-0" />
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div
                  className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-700">Event color</span>
              </button>

              {showColorPicker && (
  <div className="absolute top-full mt-3 left-0 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-20">
    <div className="grid grid-cols-6 sm:grid-cols-8 gap-3">
      {GOOGLE_CALENDAR_COLORS.map((c) => (
        <button
          key={c.value}
          type="button"
          onClick={() => {
            setColor(c.value);
            setShowColorPicker(false);
          }}
          className={`w-3 h-3 rounded-full transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center shadow-sm hover:shadow-md cursor-pointer`}
          style={{ backgroundColor: c.value }}
          title={c.name}
          aria-label={`Select ${c.name} color`}
        >
          {color === c.value && (
            <Check className="w-5 h-5 text-white drop-shadow-md" strokeWidth={3} />
          )}
        </button>
      ))}
    </div>
  </div>
)}

            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            {event && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  onDelete();
                  handleClose();
                }}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
