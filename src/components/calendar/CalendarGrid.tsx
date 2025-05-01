
import type { CalendarEvent } from "@/context/calendar-context";
import { DayCell } from "./DayCell";

interface CalendarGridProps {
  weeks: Date[][];
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  getEventsForDate: (date: Date) => CalendarEvent[];
  isMobile?: boolean;
  viewMode?: 'month' | 'week';
}

export function CalendarGrid({
  weeks,
  currentDate,
  selectedDate,
  onDateSelect,
  getEventsForDate,
  isMobile = false,
  viewMode = 'month',
}: CalendarGridProps) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // For mobile, show abbreviated day names
  const displayWeekdays = isMobile ? weekdays.map(day => day.substring(0, 1)) : weekdays;

  // Calculate cell height based on view mode
  const cellHeightClass = viewMode === 'week' || (isMobile && weeks.length === 1) 
    ? "min-h-[150px]" 
    : (isMobile ? "min-h-[90px]" : "min-h-[110px]");

  return (
    <div className="bg-card rounded-xl shadow-sm overflow-hidden border">
      <div className="grid grid-cols-7 bg-muted/30">
        {displayWeekdays.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      
      <div className={`grid grid-cols-7 divide-x divide-y divide-border/50 ${isMobile ? "text-sm" : ""}`}>
        {weeks.flat().map((day, index) => (
          <DayCell
            key={index}
            day={day}
            currentDate={currentDate}
            events={getEventsForDate(day)}
            onDateSelect={onDateSelect}
            isMobile={isMobile}
            heightClass={cellHeightClass}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
}
