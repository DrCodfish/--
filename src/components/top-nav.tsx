
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { ProfileDialog } from "@/components/profile/ProfileDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound, LogOut } from "lucide-react";

export function TopNav() {
  const { currentUser, setCurrentUser } = useAuth();
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <header className="w-full border-b border-black dark:border-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold">Round Table</h1>
        </Link>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-black dark:border-white flex items-center gap-2">
                    <UserRound className="h-4 w-4" />
                    <span>{currentUser.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center cursor-pointer" 
                    onClick={() => setShowProfileDialog(true)}
                  >
                    <UserRound className="mr-2 h-4 w-4" />
                    <span>View Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex items-center cursor-pointer" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Button asChild variant="outline" className="border-black dark:border-white">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild variant="default" className="bg-round-blue hover:bg-blue-600">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <ProfileDialog 
        open={showProfileDialog} 
        onClose={() => setShowProfileDialog(false)} 
      />
    </header>
  );
}
