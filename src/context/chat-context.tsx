
import { createContext, useContext, useState, ReactNode } from 'react';

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
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'date'>) => ChatMessage;
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
      {children}
    </ChatContext.Provider>
  );
};
