
import { createContext, useContext, useState, ReactNode } from 'react';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  storeId: string;
  createdBy: string;
}

interface CalendarContextType {
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => CalendarEvent;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Staff Meeting',
      start: new Date(2025, 3, 25, 10, 0),
      end: new Date(2025, 3, 25, 11, 0),
      description: 'Weekly staff meeting',
      storeId: '1',
      createdBy: 'owner1',
    },
    {
      id: '2',
      title: 'Inventory Check',
      start: new Date(2025, 3, 26, 14, 0),
      end: new Date(2025, 3, 26, 16, 0),
      description: 'Monthly inventory check',
      storeId: '1',
      createdBy: 'employee1',
    }
  ]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addCalendarEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    try {
      // Validate required fields
      if (!eventData.title || !eventData.start || !eventData.end || !eventData.storeId) {
        throw new Error("Missing required event information");
      }
      
      const newEvent = {
        ...eventData,
        id: generateId(),
      };
      
      setCalendarEvents(prevEvents => [...prevEvents, newEvent]);
      return newEvent;
    } catch (error) {
      console.error("Error adding calendar event:", error);
      throw error; // Rethrow to let the component handle it
    }
  };

  return (
    <CalendarContext.Provider value={{
      calendarEvents,
      addCalendarEvent
    }}>
      {children}
    </CalendarContext.Provider>
  );
};
