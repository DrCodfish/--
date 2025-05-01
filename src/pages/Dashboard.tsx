import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { useStore } from "@/context/store-context";
import { useForum } from "@/context/forum-context";
import { useChat } from "@/context/chat-context";
import { useCalendar } from "@/context/calendar-context";
import { MessageCircle, MessageSquare, Calendar } from "lucide-react";
import { supabase } from '/home/kiranrangoon0/round-table-connect/supabaseClient.ts';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { stores } = useStore();
  const { forumPosts } = useForum();
  const { chatMessages } = useChat();
  const { calendarEvents } = useCalendar();
  const [userStore, setUserStore] = useState<any>(null);

  useEffect(() => {
    if (currentUser?.storeId) {
      const store = stores.find(s => s.id === currentUser.storeId);
      if (store) {
        setUserStore(store);
      }
    }
  }, [currentUser, stores]);

  // Filter data relevant to the user's store
  const storeForumPosts = forumPosts.filter(post => post.storeId === currentUser?.storeId);
  const storeChatMessages = chatMessages.filter(
    msg => msg.storeId === currentUser?.storeId && !msg.isOwnerOnly
  );
  const storeEvents = calendarEvents.filter(event => event.storeId === currentUser?.storeId);

  // Get upcoming events (next 7 days)
  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 7);

  const upcomingEvents = storeEvents.filter(event => {
    const eventDate = new Date(event.start);
    return eventDate >= now && eventDate <= nextWeek;
  });

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {userStore && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{userStore.name}</CardTitle>
              <CardDescription>
                Region: {userStore.region} | 
                {currentUser?.isOwner ? ' Store Owner' : ' Employee'}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/forum" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Forum
              </CardTitle>
              <CardDescription>
                {storeForumPosts.length} posts in your store's forum
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {storeForumPosts.slice(0, 3).map(post => (
                  <li key={post.id} className="truncate">
                    • {post.title}
                  </li>
                ))}
                {storeForumPosts.length === 0 && (
                  <p className="text-muted-foreground">No forum posts yet</p>
                )}
              </ul>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/chat" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat
              </CardTitle>
              <CardDescription>
                {storeChatMessages.length} messages in your store's chat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {storeChatMessages.slice(0, 3).map(message => (
                  <li key={message.id} className="truncate">
                    <span className="font-medium">{message.authorName}: </span>
                    {message.content}
                  </li>
                ))}
                {storeChatMessages.length === 0 && (
                  <p className="text-muted-foreground">No chat messages yet</p>
                )}
              </ul>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/calendar" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Calendar
              </CardTitle>
              <CardDescription>
                {upcomingEvents.length} upcoming events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {upcomingEvents.slice(0, 3).map(event => (
                  <li key={event.id} className="truncate">
                    • {event.title} - {new Date(event.start).toLocaleString(undefined, { 
                      month: 'short', 
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </li>
                ))}
                {upcomingEvents.length === 0 && (
                  <p className="text-muted-foreground">No upcoming events</p>
                )}
              </ul>
            </CardContent>
          </Card>
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
