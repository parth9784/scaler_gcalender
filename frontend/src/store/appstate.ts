import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { EventType } from '../types';

interface AppState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  eventTypeFilters: Record<EventType, boolean>;
  toggleEventTypeFilter: (type: EventType) => void;
  setEventTypeFilter: (type: EventType, enabled: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (open) => set({ isSidebarOpen: open }),
      eventTypeFilters: {
        event: true,
        task: true,
        reminder: true,
      },
      toggleEventTypeFilter: (type) =>
        set((state) => ({
          eventTypeFilters: {
            ...state.eventTypeFilters,
            [type]: !state.eventTypeFilters[type],
          },
        })),
      setEventTypeFilter: (type, enabled) =>
        set((state) => ({
          eventTypeFilters: {
            ...state.eventTypeFilters,
            [type]: enabled,
          },
        })),
    }),
    {
      name: 'calendar-app-storage',
    }
  )
);