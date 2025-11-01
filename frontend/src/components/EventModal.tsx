import React, { useState, useEffect } from 'react';
import { X, Trash2, Clock, AlignLeft, Palette } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
            <h2 className="text-xl font-medium text-gray-900">
              {event ? 'Edit Event' : 'New Event'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {/* Title */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title"
              className="w-full text-2xl font-normal border-0 border-b-2 border-gray-200 focus:border-blue-600 outline-none pb-3 placeholder-gray-400 transition-colors"
              required
              autoFocus
            />
          </div>

          {/* Date and Time */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Clock className="w-5 h-5 text-gray-500 mt-3" />
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Start
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    required
                    aria-label="Start date"
                  />
                  {!allDay && (
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      required
                      aria-label="Start time"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    End
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    required
                    aria-label="End date"
                  />
                  {!allDay && (
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      required
                      aria-label="End time"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* All Day Toggle */}
            <div className="flex items-center space-x-3 ml-9">
              <input
                type="checkbox"
                id="allDay"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-600 cursor-pointer"
              />
              <label htmlFor="allDay" className="text-sm text-gray-700 font-medium cursor-pointer">
                All day
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start space-x-4">
            <AlignLeft className="w-5 h-5 text-gray-500 mt-3" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description"
              rows={3}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none transition-all"
            />
          </div>

          {/* Color Picker */}
          <div className="flex items-center space-x-4">
            <Palette className="w-5 h-5 text-gray-500" />
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="flex items-center space-x-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className="w-7 h-7 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-700 font-medium">Event color</span>
              </button>

              {showColorPicker && (
                <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-10 grid grid-cols-6 gap-3 elevation-3">
                  {GOOGLE_CALENDAR_COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => {
                        setColor(c.value);
                        setShowColorPicker(false);
                      }}
                      className="w-10 h-10 rounded-full hover:scale-110 transition-transform shadow-md hover:shadow-lg"
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                      aria-label={`Select ${c.name} color`}
                    >
                      {color === c.value && (
                        <svg
                          className="w-10 h-10"
                          fill="white"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            {event && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  onDelete();
                  handleClose();
                }}
                className="flex items-center space-x-2 px-5 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg elevation-2"
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
