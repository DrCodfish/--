
import { format, isSameMonth, isToday } from "date-fns";
import type { CalendarEvent } from "@/context/calendar-context";
import { EventPreview } from "./EventPreview";

interface DayCellProps {
  day: Date;
  currentDate: Date;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
  isMobile?: boolean;
  heightClass?: string;
  viewMode?: 'month' | 'week';
}

export function DayCell({ 
  day, 
  currentDate, 
  events, 
  onDateSelect, 
  isMobile = false,
  heightClass = "min-h-[110px]",
  viewMode = 'month'
}: DayCellProps) {
  const isCurrentMonth = isSameMonth(day, currentDate);
  
  // In week view, show more events
  const maxEventsToShow = viewMode === 'week' ? (isMobile ? 4 : 6) : (isMobile ? 2 : 3);

  return (
    <div
      className={`
        ${heightClass} ${isMobile ? 'p-1.5' : 'p-3'} 
        relative transition-colors duration-200
        hover:bg-accent/30 cursor-pointer
        ${!isCurrentMonth && viewMode === 'month' ? "bg-muted/30" : ""}
        ${isToday(day) ? "bg-secondary/20 ring-2 ring-primary/50 ring-inset" : ""}
      `}
      onClick={() => onDateSelect(day)}
    >
      <div className={`
        font-medium ${isMobile ? 'text-xs' : 'text-sm'} 
        rounded-full w-6 h-6 flex items-center justify-center mb-1
        ${!isCurrentMonth && viewMode === 'month' ? "text-muted-foreground" : ""}
        ${isToday(day) ? "bg-primary text-primary-foreground" : ""}
      `}>
        {format(day, "d")}
      </div>
      
      <div className={`overflow-y-auto ${viewMode === 'week' ? 'max-h-[120px]' : (isMobile ? 'max-h-[60px]' : 'max-h-[76px]')} space-y-1`}>
        {events.slice(0, maxEventsToShow).map(event => (
          <EventPreview 
            key={event.id} 
            event={event} 
            onClick={(e) => e.stopPropagation()}
            isMobile={isMobile}
          />
        ))}
        {events.length > maxEventsToShow && (
          <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-muted-foreground px-1`}>
            +{events.length - maxEventsToShow} more
          </div>
        )}
      </div>
    </div>
  );
}
