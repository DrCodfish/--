<<<<<<< HEAD

import { createContext, useContext, useState, ReactNode } from 'react';
=======
import { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../supabaseClient';
>>>>>>> 060614a (readded remote)

export interface CalendarEvent {
  id: string;
  title: string;
<<<<<<< HEAD
  start: Date;
  end: Date;
=======
  start: string;
  end: string;
>>>>>>> 060614a (readded remote)
  description: string;
  storeId: string;
  createdBy: string;
}

interface CalendarContextType {
  calendarEvents: CalendarEvent[];
<<<<<<< HEAD
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => CalendarEvent;
=======
  fetchCalendarEvents: () => Promise<void>;
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<CalendarEvent | null>;
>>>>>>> 060614a (readded remote)
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
<<<<<<< HEAD
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
=======
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  const fetchCalendarEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .order('start', { ascending: true });

      if (error) throw error;

      setCalendarEvents(data || []);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    }
  };

  const addCalendarEvent = async (eventData: Omit<CalendarEvent, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .insert(eventData)
        .select()
        .single();

      if (error) throw error;

      setCalendarEvents((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error adding calendar event:', error);
      return null;
>>>>>>> 060614a (readded remote)
    }
  };

  return (
<<<<<<< HEAD
    <CalendarContext.Provider value={{
      calendarEvents,
      addCalendarEvent
    }}>
=======
    <CalendarContext.Provider
      value={{ calendarEvents, fetchCalendarEvents, addCalendarEvent }}
    >
>>>>>>> 060614a (readded remote)
      {children}
    </CalendarContext.Provider>
  );
};
<<<<<<< HEAD
=======

export const fetchCalendarEvents = async (storeId: string) => {
  const { data, error } = await supabase
    .from('calendar_events')
    .select('*')
    .eq('store_id', storeId)
    .order('start', { ascending: true });

  if (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }

  return data;
};

export const createCalendarEvent = async (event: {
  title: string;
  description: string;
  start: string;
  end: string;
  store_id: string;
  created_by: string;
}) => {
  const { data, error } = await supabase.from('calendar_events').insert(event).select().single();

  if (error) {
    console.error('Error creating calendar event:', error);
    return null;
  }

  return data;
};
>>>>>>> 060614a (readded remote)
