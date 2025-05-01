
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile } from "lucide-react";

const EMOJIS = ["😊", "😎", "🤓", "😄", "🤠", "🤗", "🤩", "😇", "🥳", "🤪", "👾", "🤖", "👻", "🎃", "🦄"];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  currentEmoji: string;
}

export function EmojiPicker({ onEmojiSelect, currentEmoji }: EmojiPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-14 h-14 p-0 text-2xl overflow-visible"
        >
          {currentEmoji || <Smile className="h-6 w-6" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-3 z-50">
        <div className="grid grid-cols-5 gap-2">
          {EMOJIS.map((emoji) => (
            <Button
              key={emoji}
              variant="ghost"
              className="h-10 w-10 p-0 text-xl"
              onClick={() => onEmojiSelect(emoji)}
            >
              {emoji}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
