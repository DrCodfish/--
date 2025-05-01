
// This file re-exports all hooks and types from domain-specific contexts
// to maintain backward compatibility with components still using the old import path

import { useAuth, User } from './auth-context';
import { useStore, Store, Region } from './store-context';
import { useForum, ForumPost, ForumReply } from './forum-context';
import { useChat, ChatMessage } from './chat-context';
import { useCalendar, CalendarEvent } from './calendar-context';
import { ReactNode } from 'react';

// Re-export all types
export type { User, Store, Region, ForumPost, ForumReply, ChatMessage, CalendarEvent };

// Create a facade hook that combines all context data
export const useData = () => {
  const auth = useAuth();
  const store = useStore();
  const forum = useForum();
  const chat = useChat();
  const calendar = useCalendar();

  return {
    // Auth context
    currentUser: auth.currentUser,
    setCurrentUser: auth.setCurrentUser,
    login: auth.login,
    register: auth.register,
    
    // Store context
    stores: store.stores,
    addStore: store.addStore,
    regions: store.regions,
    addRegion: store.addRegion,
    
    // Forum context
    forumPosts: forum.forumPosts,
    addForumPost: forum.addForumPost,
    addForumReply: forum.addForumReply,
    
    // Chat context
    chatMessages: chat.chatMessages,
    addChatMessage: chat.addChatMessage,
    
    // Calendar context
    calendarEvents: calendar.calendarEvents,
    addCalendarEvent: calendar.addCalendarEvent
  };
};

// No need to export a provider as we're using the AppProvider

