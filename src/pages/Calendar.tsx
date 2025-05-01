import { useState } from "react";
import { format } from "date-fns";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useAuth } from "@/context/auth-context";
import { useCalendar as useCalendarContext } from "@/context/calendar-context";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { EventForm } from "@/components/calendar/EventForm";
import { useCalendar } from "@/hooks/use-calendar";
import { useIsMobile } from "@/hooks/use-mobile";

const CalendarPage = () => {
  const { currentUser } = useAuth();
  const { calendarEvents, addCalendarEvent } = useCalendarContext();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const isMobile = useIsMobile();

  const { weeks, currentDate, viewMode, goToPrevious, goToNext, goToToday, toggleViewMode } = useCalendar(
    new Date(), 
    isMobile
  );

  const parseTimeInput = (timeString: string): [number, number] => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return [hours || 0, minutes || 0];
  };

  const handleCreateEvent = ({
    title,
    description,
    startTime,
    endTime,
  }: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
  }) => {
    if (!selectedDate) {
      toast({
        title: "Error",
        description: "Unable to create event. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (!currentUser || !currentUser.storeId) {
      toast({
        title: "Error",
        description: "You must be logged in with a store to create events.",
        variant: "destructive"
      });
      return;
    }

    const [startHours, startMinutes] = parseTimeInput(startTime);
    const [endHours, endMinutes] = parseTimeInput(endTime);
    
    const startDate = new Date(selectedDate);
    startDate.setHours(startHours, startMinutes, 0);
    
    const endDate = new Date(selectedDate);
    endDate.setHours(endHours, endMinutes, 0);

    if (endDate <= startDate) {
      toast({
        title: "Invalid Time Range",
        description: "End time must be after start time.",
        variant: "destructive"
      });
      return;
    }

    try {
      addCalendarEvent({
        title: title.trim(),
        description: description.trim(),
        start: startDate,
        end: endDate,
        storeId: currentUser.storeId,
        createdBy: currentUser.username || 'unknown'
      });

      toast({
        title: "Event Created",
        description: `${title} has been added to the calendar.`
      });
      setShowEventForm(false);
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: "Unable to create event. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getEventsForDate = (date: Date) => {
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.start);
      return format(eventDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") && 
             event.storeId === currentUser?.storeId;
    });
  };

  const handleAddEventClick = () => {
    setSelectedDate(new Date());
    setShowEventForm(true);
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return calendarEvents
      .filter(event => {
        const eventDate = new Date(event.start);
        return eventDate >= now && event.storeId === currentUser?.storeId;
      })
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .slice(0, 2);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-4">
        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={goToPrevious}
          onNextMonth={goToNext}
          onToday={goToToday}
          onAddEvent={handleAddEventClick}
          onToggleViewMode={toggleViewMode}
          viewMode={viewMode}
          upcomingEvents={getUpcomingEvents()}
        />
        
        <CalendarGrid
          weeks={weeks}
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateSelect={(date) => {
            setSelectedDate(date);
            setShowEventForm(true);
          }}
          getEventsForDate={getEventsForDate}
          isMobile={isMobile}
          viewMode={viewMode}
        />

        <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
          <EventForm
            selectedDate={selectedDate}
            onCreateEvent={handleCreateEvent}
            onClose={() => setShowEventForm(false)}
          />
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
