<<<<<<< HEAD

import { createContext, useContext, useState, ReactNode } from 'react';
=======
import { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../supabaseClient';
>>>>>>> 060614a (readded remote)

export interface ChatMessage {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  storeId: string;
  isOwnerOnly: boolean;
  date: string;
}

interface ChatContextType {
  chatMessages: ChatMessage[];
<<<<<<< HEAD
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'date'>) => ChatMessage;
=======
  fetchChatMessages: () => Promise<void>;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'date'>) => Promise<ChatMessage | null>;
>>>>>>> 060614a (readded remote)
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
<<<<<<< HEAD
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello everyone!',
      authorId: '1',
      authorName: 'owner1',
      storeId: '1',
      isOwnerOnly: false,
      date: new Date().toISOString(),
    },
    {
      id: '2',
      content: 'Owner meeting tomorrow at 10 AM',
      authorId: '1',
      authorName: 'owner1',
      storeId: '1',
      isOwnerOnly: true,
      date: new Date().toISOString(),
    }
  ]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addChatMessage = (messageData: Omit<ChatMessage, 'id' | 'date'>) => {
    const newMessage = {
      ...messageData,
      id: generateId(),
      date: new Date().toISOString(),
    };
    setChatMessages([...chatMessages, newMessage]);
    return newMessage;
  };

  return (
    <ChatContext.Provider value={{
      chatMessages,
      addChatMessage
    }}>
=======
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const fetchChatMessages = async () => {
    try {
      console.log('Fetching chat messages...');
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;

      console.log('Chat messages fetched successfully:', data);
      setChatMessages(data || []);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const addChatMessage = async (messageData: Omit<ChatMessage, 'id' | 'date'>) => {
    try {
      console.log('Adding chat message:', messageData);
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({ ...messageData, date: new Date().toISOString() })
        .select()
        .single();

      if (error) throw error;

      console.log('Chat message added successfully:', data);
      setChatMessages((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error adding chat message:', error);
      return null;
    }
  };

  return (
    <ChatContext.Provider value={{ chatMessages, fetchChatMessages, addChatMessage }}>
>>>>>>> 060614a (readded remote)
      {children}
    </ChatContext.Provider>
  );
};
