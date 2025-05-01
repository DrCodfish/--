
import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  password: string;
  isOwner: boolean;
  storeId: string | null;
  approved: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  login: (username: string, password: string, isOwner: boolean) => User | null;
  register: (username: string, password: string, isOwner: boolean, storeId?: string) => User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial mock data
const initialUsers: User[] = [
  { id: '1', username: 'owner1', password: 'pass123', isOwner: true, storeId: '1', approved: true },
  { id: '2', username: 'employee1', password: 'pass123', isOwner: false, storeId: '1', approved: true },
  { id: '3', username: 'owner2', password: 'pass123', isOwner: true, storeId: '2', approved: true },
];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const login = (username: string, password: string, isOwner: boolean) => {
    const user = users.find(
      u => u.username === username && 
      u.password === password && 
      u.isOwner === isOwner
    );
    
    if (user) {
      if (!isOwner && !user.approved) {
        return null;
      }
      setCurrentUser(user);
      return user;
    }
    
    return null;
  };

  const register = (username: string, password: string, isOwner: boolean, storeId?: string) => {
    const newUser = {
      id: generateId(),
      username,
      password,
      isOwner,
      storeId: storeId || null,
      approved: isOwner // Owners are automatically approved
    };
    
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      login,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};
