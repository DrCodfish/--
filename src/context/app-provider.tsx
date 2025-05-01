
import { ReactNode } from 'react';
import { AuthProvider } from './auth-context';
import { StoreProvider } from './store-context';
import { ForumProvider } from './forum-context';
import { ChatProvider } from './chat-context';
import { CalendarProvider } from './calendar-context';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <StoreProvider>
        <ForumProvider>
          <ChatProvider>
            <CalendarProvider>
              {children}
            </CalendarProvider>
          </ChatProvider>
        </ForumProvider>
      </StoreProvider>
    </AuthProvider>
  );
};
