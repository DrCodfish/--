import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CalendarEvent } from "@/context/calendar-context";

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onAddEvent: () => void;
  onToggleViewMode?: () => void;
  viewMode?: 'month' | 'week';
  upcomingEvents?: CalendarEvent[];
}

export function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onAddEvent,
  onToggleViewMode,
  viewMode = 'month',
  upcomingEvents = [],
}: CalendarHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <h1 className="text-2xl font-bold">Calendar</h1>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline"
            className="border-black dark:border-white"
            onClick={onToday}
          >
            Today
          </Button>
          
          <div className="flex items-center">
            <Button 
              variant="outline"
              className="p-2 h-9 w-9 border-black dark:border-white"
              onClick={onPreviousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <h2 className="text-lg font-semibold px-2 min-w-[130px] text-center">
              {format(currentDate, viewMode === 'month' ? "MMMM yyyy" : "'Week of' MMM d")}
            </h2>
            
            <Button 
              variant="outline"
              className="p-2 h-9 w-9 border-black dark:border-white"
              onClick={onNextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {onToggleViewMode && (
            <Button
              variant="outline"
              className="border-black dark:border-white"
              onClick={onToggleViewMode}
            >
              {viewMode === 'month' ? (
                <><CalendarDays className="h-4 w-4 mr-2" /> Week View</>
              ) : (
                <><CalendarDays className="h-4 w-4 mr-2" /> Month View</>
              )}
            </Button>
          )}
          
          <Button 
            className="bg-round-blue hover:bg-blue-600"
            onClick={onAddEvent}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {upcomingEvents && upcomingEvents.length > 0 && (
        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
          <h3 className="font-medium">Upcoming Events:</h3>
          <div className="space-y-1">
            {upcomingEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="flex items-center gap-2 text-sm">
                <div className="w-32">
                  {format(new Date(event.start), "MMM d, h:mm a")}
                </div>
                <div className="font-medium">{event.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
