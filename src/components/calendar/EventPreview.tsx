
import { format } from "date-fns";
import type { CalendarEvent } from "@/context/calendar-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EventPreviewProps {
  event: CalendarEvent;
  onClick?: (e: React.MouseEvent) => void;
  isMobile?: boolean;
}

export function EventPreview({ event, onClick, isMobile = false }: EventPreviewProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div 
          className={`
            bg-primary/90 text-primary-foreground 
            ${isMobile ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'} 
            rounded-md truncate cursor-pointer hover:bg-primary transition-colors shadow-sm
          `}
          onClick={onClick}
        >
          {isMobile ? format(new Date(event.start), "h:mm") : format(new Date(event.start), "h:mm a")} {event.title}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 sm:w-80 p-4 rounded-lg">
        <div className="space-y-2">
          <h4 className="font-semibold text-lg">{event.title}</h4>
          <p className="text-sm text-muted-foreground">
            {format(new Date(event.start), "h:mm a")} - {format(new Date(event.end), "h:mm a")}
          </p>
          {event.description && (
            <p className="text-sm border-l-2 border-primary/50 pl-2 mt-2">
              {event.description}
            </p>
          )}
          <p className="text-xs text-muted-foreground pt-2 border-t">
            Created by: {event.createdBy}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
