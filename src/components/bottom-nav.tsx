
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MessageCircle, Calendar, MessageSquare } from "lucide-react";

export function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    {
      name: "Forum",
      href: "/forum",
      icon: MessageSquare,
    },
    {
      name: "Chat",
      href: "/chat",
      icon: MessageCircle,
    },
    {
      name: "Calendar",
      href: "/calendar",
      icon: Calendar,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-black dark:border-white">
      <div className="grid h-full grid-cols-3">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center",
              location.pathname === item.href
                ? "text-round-blue"
                : "text-foreground hover:text-round-blue"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
