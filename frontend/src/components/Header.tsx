import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, CalendarFold, Menu, LogOut, User } from 'lucide-react';
import type { ViewType } from '../types';
import { formatMonthYear, formatWeekRange, formatDayHeader } from '../utils/dateUtils';
import { useAppStore } from '../store/appstate';
import { useAuthStore } from '../store/authStore';
import { useAuth } from '../hooks/useAuth';

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
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getInitials = () => {
    if (!user) return 'U';
    const firstInitial = user.first_name?.[0] || user.username?.[0] || '';
    const lastInitial = user.last_name?.[0] || '';
    return (firstInitial + lastInitial).toUpperCase() || user.username?.[0]?.toUpperCase() || 'U';
  };

  const handleLogout = async () => {
    await logout();
    setShowProfileMenu(false);
  };

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
          className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
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
            className="px-4 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
          >
            Today
          </button>

          {/* Prev / Next */}
          <button
            onClick={() => onNavigate('prev')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => onNavigate('next')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
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
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors duration-200 cursor-pointer
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
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium hidden sm:inline">Create</span>
        </button>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            aria-label="Profile menu"
          >
            {getInitials()}
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowProfileMenu(false)}
              />
              
              {/* Menu */}
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-semibold text-lg">
                      {getInitials()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.first_name && user?.last_name
                          ? `${user.first_name} ${user.last_name}`
                          : user?.username}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
