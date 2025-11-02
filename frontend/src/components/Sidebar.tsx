import React from 'react';
import { format, isSameDay, isToday } from '../utils/dateUtils';
import { getMonthDays, isSameMonth } from '../utils/dateUtils';
import { useAppStore } from '../store/appstate';
import { Menu, X } from 'lucide-react';

interface SidebarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  onCreateClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentDate,
  onDateSelect,
  onCreateClick,
}) => {
  const { isSidebarOpen, toggleSidebar, eventTypeFilters, toggleEventTypeFilter } = useAppStore();
  const [miniCalendarDate, setMiniCalendarDate] = React.useState(new Date());
  const days = getMonthDays(miniCalendarDate);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handlePrevMonth = () => {
    setMiniCalendarDate(new Date(miniCalendarDate.getFullYear(), miniCalendarDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setMiniCalendarDate(new Date(miniCalendarDate.getFullYear(), miniCalendarDate.getMonth() + 1));
  };

  const handleDateClick = (day: Date) => {
    onDateSelect(day);
    setMiniCalendarDate(day);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative top-0 left-0 h-full z-50
          bg-white border-r border-gray-200 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isSidebarOpen ? 'w-72 min-w-[18rem]' : 'lg:w-16 lg:min-w-16 w-72'}
        `}
      >
        {/* Content - only show when open */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden lg:hidden'} flex flex-col h-full`}>
          {/* Header with Toggle Button */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Collapse sidebar"
            >
              <X className="w-5 h-5 text-gray-600 cursor-pointer" />
            </button>
          </div>

          {/* Create Button */}
          <div className="p-4">
            <button
              onClick={onCreateClick}
              aria-label="Create event"
              className="flex items-center space-x-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-lg shadow-sm transition-all w-full justify-center"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-medium">Create</span>
            </button>
          </div>

          {/* Mini Calendar */}
          <div className="px-4 pb-4">
            <div className="bg-white rounded-lg">
              {/* Month Header */}
              <div className="flex items-center justify-between px-3 py-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  {format(miniCalendarDate, 'MMMM yyyy')}
                </h3>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handlePrevMonth}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Previous month"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Next month"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Week Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2 px-2">
                {weekDays.map((day, index) => (
                  <div
                    key={index}
                    className="text-center text-[11px] font-semibold text-gray-600 py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1 px-2 pb-3">
                {days.map((day, index) => {
                  const isCurrentMonth = isSameMonth(day, miniCalendarDate);
                  const isCurrentDay = isToday(day);
                  const isSelected = isSameDay(day, currentDate);

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(day)}
                      aria-label={`Select ${format(day, 'MMMM d, yyyy')}`}
                      className={`
                        aspect-square flex items-center justify-center text-sm rounded-md transition-all select-none
                        ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-800'}
                        ${isCurrentDay && !isSelected ? 'bg-blue-50 text-blue-600 font-semibold' : ''}
                        ${isSelected ? 'bg-blue-600 text-white font-semibold shadow-sm' : ''}
                        ${!isCurrentDay && !isSelected ? 'hover:bg-gray-100' : ''}
                      `}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* My Calendars Section */}
          <div className="px-4 flex-1 overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-900 mb-2">My calendars</h3>
              <div className="space-y-1">
                <label className="flex items-center space-x-3 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer" 
                    checked={eventTypeFilters.event}
                    onChange={() => toggleEventTypeFilter('event')}
                  />
                  <span className="text-sm text-gray-700">Events</span>
                </label>
                <label className="flex items-center space-x-3 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-purple-600 rounded cursor-pointer" 
                    checked={eventTypeFilters.task}
                    onChange={() => toggleEventTypeFilter('task')}
                  />
                  <span className="text-sm text-gray-700">Tasks</span>
                </label>
                <label className="flex items-center space-x-3 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-green-600 rounded cursor-pointer" 
                    checked={eventTypeFilters.reminder}
                    onChange={() => toggleEventTypeFilter('reminder')}
                  />
                  <span className="text-sm text-gray-700">Reminders</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsed state indicator */}
        {!isSidebarOpen && (
          <div className="hidden lg:flex flex-col items-center py-4 space-y-4">
            <button
              onClick={toggleSidebar}
              className="p-2.5 hover:bg-gray-100 rounded-md transition-all"
              aria-label="Expand sidebar"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onCreateClick}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-all"
              aria-label="Create event"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
