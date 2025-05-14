<<<<<<< HEAD
import { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../supabaseClient'; // Ensure Supabase is properly initialized
import { hash, compare } from 'bcryptjs'; // For hashing and comparing passwords
=======
;import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
>>>>>>> 060614a (readded remote)

export interface User {
  id: string;
  username: string;
<<<<<<< HEAD
  password?: string; // Password is optional to avoid exposing it unnecessarily
=======
  password?: string;
>>>>>>> 060614a (readded remote)
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

<<<<<<< HEAD
  const login = async (username: string, password: string): Promise<User | null> => {
    try {
      // Fetch user from the database by username
=======
  useEffect(() => {
    console.log("AuthProvider initialized. Current user:", currentUser);
  }, [currentUser]);

  const login = async (username: string, password: string): Promise<User | null> => {
    console.log("Attempting login with username:", username);
    try {
>>>>>>> 060614a (readded remote)
      const { data, error } = await supabase
        .from('users')
        .select('id, username, password, is_owner, store_id, approved')
        .eq('username', username)
        .single();

      if (error || !data) {
        console.error('Login failed: User not found or error occurred', error);
        return null;
      }

<<<<<<< HEAD
      // Compare provided password with the stored hashed password
      const isMatch = await compare(password, data.password);
=======
      // Check if the user is approved
      if (!data.approved) {
        console.error('Login failed: User is not approved');
        return null;
      }

      // Compare provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, data.password);
>>>>>>> 060614a (readded remote)
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

<<<<<<< HEAD
=======
      console.log("Login successful. Setting current user:", user);
>>>>>>> 060614a (readded remote)
      setCurrentUser(user);
      return user;
    } catch (err) {
      console.error('Unexpected error during login:', err);
      return null;
    }
  };

  const register = async (username: string, password: string, isOwner: boolean, storeId?: string): Promise<User | null> => {
    try {
<<<<<<< HEAD
      // Hash the password before storing it
      const hashedPassword = await hash(password, 10);

      // Insert new user into the database
=======
      console.log("Registering user with username:", username);

      // Check if the username already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .single();

      if (existingUser) {
        console.error('Registration failed: Username already exists');
        return null;
      }

      if (checkError && checkError.code !== 'PGRST116') { // Ignore "No rows found" error
        console.error('Error checking existing username:', checkError);
        return null;
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Password hashed successfully.");

      let resolvedStoreId = storeId;

      if (!storeId) {
        console.log("No store ID provided. Creating a default store.");
        const { data: storeData, error: storeError } = await supabase
          .from('stores')
          .insert({ name: 'Default Store', created_by: supabase.auth.user()?.id }) // Ensure the user ID is included
          .select('id')
          .single();

        if (storeError || !storeData) {
          console.error('Failed to create default store:', storeError);
          return null;
        }

        resolvedStoreId = storeData.id;
        console.log("Default store created with ID:", resolvedStoreId);
      }

>>>>>>> 060614a (readded remote)
      const { data, error } = await supabase.from('users').insert({
        username,
        password: hashedPassword,
        is_owner: isOwner,
<<<<<<< HEAD
        store_id: storeId || null,
=======
        store_id: resolvedStoreId, // Use the resolved store ID
>>>>>>> 060614a (readded remote)
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

<<<<<<< HEAD
=======
      console.log("Registration successful. New user:", newUser);
>>>>>>> 060614a (readded remote)
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
