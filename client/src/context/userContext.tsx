'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UpdateUserProfile, UpdateUserRole } from '../types/user';
import { getUserProfile, updateUserProfile, updateUserRole } from '../utils/api';
import { useAuth } from '@/hooks/useAuth';

interface UserContextType {
  userProfile: User | null;
  fetchUserProfile: () => Promise<void>;
  updateProfile: (data: UpdateUserProfile) => Promise<void>;
  updateRole: (data: UpdateUserRole) => Promise<void>;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token, user } = useAuth();

  // Fetch user profile when token changes (e.g., after login/register)
  useEffect(() => {
    const fetchProfile = async () => {
      if (token && user) {
        try {
          setIsLoading(true);
          const profile = await getUserProfile(token);
          setUserProfile(profile);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          setUserProfile(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUserProfile(null);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, user]); // Re-run when token or user changes

  const fetchUserProfile = async () => {
    if (!token) {
      setUserProfile(null);
      return;
    }
    try {
      setIsLoading(true);
      const profile = await getUserProfile(token);
      setUserProfile(profile);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUserProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: UpdateUserProfile) => {
    if (!token) throw new Error('No token available');
    try {
      setIsLoading(true);
      const updatedUser = await updateUserProfile(data, token);
      setUserProfile(updatedUser);
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRole = async (data: UpdateUserRole) => {
    if (!token) throw new Error('No token available');
    try {
      setIsLoading(true);
      const updatedUser = await updateUserRole(data, token);
      setUserProfile(updatedUser);
    } catch (error) {
      console.error('Failed to update role:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, fetchUserProfile, updateProfile, updateRole, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

