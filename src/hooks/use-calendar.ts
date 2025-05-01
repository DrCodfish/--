
import { useState } from "react";
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  addMonths,
  addDays,
  startOfDay,
  addWeeks,
  subWeeks
} from "date-fns";

export const useCalendar = (initialDate: Date = new Date(), weekViewOnly = false) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [viewMode, setViewMode] = useState<'month' | 'week'>(weekViewOnly ? 'week' : 'month');
  
  // Get all days based on view mode
  let calendarStart, calendarEnd, allDays;
  
  if (viewMode === 'month') {
    // Month view - get all days in current month (including days from prev/next months)
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    calendarStart = startOfWeek(monthStart);
    calendarEnd = endOfWeek(monthEnd);
  } else {
    // Week view - get current week only
    calendarStart = startOfWeek(currentDate);
    calendarEnd = endOfWeek(currentDate);
  }
  
  // Get all days in the calendar view
  allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  
  // Split days into weeks
  const weeks: Date[][] = [];
  let week: Date[] = [];
  
  allDays.forEach((day, index) => {
    if (index % 7 === 0 && index > 0) {
      weeks.push(week);
      week = [];
    }
    week.push(day);
  });
  
  if (week.length > 0) {
    weeks.push(week);
  }
  
  // Show just current week if in week mode
  const visibleWeeks = viewMode === 'week' ? [weeks[0]] : weeks;

  // Add navigation functions
  const goToPreviousMonth = () => setCurrentDate(addMonths(currentDate, -1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToPreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const goToNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const goToToday = () => setCurrentDate(startOfDay(new Date()));
  const toggleViewMode = () => setViewMode(viewMode === 'month' ? 'week' : 'month');
  
  const goToPrevious = viewMode === 'month' ? goToPreviousMonth : goToPreviousWeek;
  const goToNext = viewMode === 'month' ? goToNextMonth : goToNextWeek;
  
  return { 
    weeks: visibleWeeks, 
    currentDate, 
    viewMode,
    goToPrevious,
    goToNext,
    goToToday,
    toggleViewMode
  };
};

export default useCalendar;
