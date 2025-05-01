
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

interface EventFormProps {
  selectedDate: Date | null;
  onCreateEvent: (eventData: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
  }) => void;
  onClose: () => void;
}

export function EventForm({ selectedDate, onCreateEvent, onClose }: EventFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter an event title.",
        variant: "destructive"
      });
      return;
    }

    if (!startTime || !endTime) {
      toast({
        title: "Missing Information",
        description: "Please set both start and end times.",
        variant: "destructive"
      });
      return;
    }

    onCreateEvent({
      title,
      description,
      startTime,
      endTime,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Add Event for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}
        </DialogTitle>
        <DialogDescription>
          Create a new event on your calendar.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="clicked-event-title">Event Title *</Label>
          <Input
            id="clicked-event-title"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="clicked-start-time">Start Time *</Label>
            <Input
              id="clicked-start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clicked-end-time">End Time *</Label>
            <Input
              id="clicked-end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="clicked-event-description">Description (Optional)</Label>
          <Textarea
            id="clicked-event-description"
            placeholder="Enter event description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
      </div>
      
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogClose>
        <Button 
          onClick={handleSubmit}
          className="bg-round-blue hover:bg-blue-600"
        >
          Add to Calendar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
