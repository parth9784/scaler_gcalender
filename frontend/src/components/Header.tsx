import React from 'react';
import { ChevronLeft, ChevronRight, Plus, CalendarFold, Menu } from 'lucide-react';
import type { ViewType } from '../types';
import { formatMonthYear, formatWeekRange, formatDayHeader } from '../utils/dateUtils';
import { useAppStore } from '../store/appstate';

interface HeaderProps {
  currentDate: Date;
  view: ViewType;
  onViewChange: (view: ViewType) => void;
  onNavigate: (direction: 'prev' | 'next' | 'today') => void;
  onCreateEvent: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentDate,
  view,
  onViewChange,
  onNavigate,
  onCreateEvent,
}) => {
  const { toggleSidebar } = useAppStore();

  const getDateRangeText = () => {
    switch (view) {
      case 'month':
        return formatMonthYear(currentDate);
      case 'week':
        return formatWeekRange(currentDate);
      case 'day':
        return formatDayHeader(currentDate);
      default:
        return '';
    }
  };

  return (
    <header className="flex items-center justify-between w-full px-6 h-16 border-b border-gray-200 bg-white shadow-sm">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-6">
        {/* Menu Button (Mobile) */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 select-none">
          <CalendarFold className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
            Calendar
          </h1>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          {/* Today */}
          <button
            onClick={() => onNavigate('today')}
            className="px-4 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            Today
          </button>

          {/* Prev / Next */}
          <button
            onClick={() => onNavigate('prev')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => onNavigate('next')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Date Range */}
        <h2 className="text-lg font-medium text-gray-800 tracking-tight min-w-[180px] hidden md:block">
          {getDateRangeText()}
        </h2>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {/* View Switcher */}
        <div className="hidden sm:flex bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm">
          {(['month', 'week', 'day'] as ViewType[]).map((type, index) => {
            const isActive = view === type;
            return (
              <button
                key={type}
                onClick={() => onViewChange(type)}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors duration-200
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'}
                  ${index !== 0 ? 'border-l border-gray-200' : ''}
                `}
              >
                {type}
              </button>
            );
          })}
        </div>


        {/* Create Event Button */}
        <button
          onClick={onCreateEvent}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium hidden sm:inline">Create</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
