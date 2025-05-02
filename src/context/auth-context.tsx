import { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../supabaseClient'; // Ensure Supabase is properly initialized
import { hash, compare } from 'bcryptjs'; // For hashing and comparing passwords

export interface User {
  id: string;
  username: string;
  password?: string; // Password is optional to avoid exposing it unnecessarily
  isOwner: boolean;
  storeId: string | null;
  approved: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  login: (username: string, password: string) => Promise<User | null>;
  register: (username: string, password: string, isOwner: boolean, storeId?: string) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<User | null> => {
    try {
      // Fetch user from the database by username
      const { data, error } = await supabase
        .from('users')
        .select('id, username, password, is_owner, store_id, approved')
        .eq('username', username)
        .single();

      if (error || !data) {
        console.error('Login failed: User not found or error occurred', error);
        return null;
      }

      // Compare provided password with the stored hashed password
      const isMatch = await compare(password, data.password);
      if (!isMatch) {
        console.error('Login failed: Invalid password');
        return null;
      }

      const user: User = {
        id: data.id,
        username: data.username,
        isOwner: data.is_owner,
        storeId: data.store_id,
        approved: data.approved,
      };

      setCurrentUser(user);
      return user;
    } catch (err) {
      console.error('Unexpected error during login:', err);
      return null;
    }
  };

  const register = async (username: string, password: string, isOwner: boolean, storeId?: string): Promise<User | null> => {
    try {
      // Hash the password before storing it
      const hashedPassword = await hash(password, 10);

      // Insert new user into the database
      const { data, error } = await supabase.from('users').insert({
        username,
        password: hashedPassword,
        is_owner: isOwner,
        store_id: storeId || null,
        approved: isOwner, // Auto-approve owners
      }).select().single();

      if (error || !data) {
        console.error('Registration failed:', error.message);
        return null;
      }

      const newUser: User = {
        id: data.id,
        username: data.username,
        isOwner: data.is_owner,
        storeId: data.store_id,
        approved: data.approved,
      };

      setCurrentUser(newUser);
      return newUser;
    } catch (err) {
      console.error('Unexpected error during registration:', err);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
