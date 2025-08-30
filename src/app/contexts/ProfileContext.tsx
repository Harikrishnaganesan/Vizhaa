"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  userType: 'organizer' | 'supplier';
  profilePicture?: string;
  createdAt?: string;
  // Add more profile fields as needed
}

interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('authToken');
      const userType = localStorage.getItem('userType') as 'organizer' | 'supplier';
      const userId = localStorage.getItem('userId');
      
      if (!token || !userType || !userId) {
        setProfile(null);
        return;
      }

      const { organizerAPI, supplierAPI } = await import('../../../services/api.js');
      
      const dashboardData = userType === 'organizer' 
        ? await organizerAPI.getDashboard()
        : await supplierAPI.getDashboard();
      
      const user = userType === 'organizer' ? dashboardData.organizer : dashboardData.supplier;
      
      if (user) {
        setProfile({
          id: userId,
          fullName: user.fullName || '',
          email: user.email || '',
          phone: user.phone || '',
          userType,
          profilePicture: user.profilePicture,
          createdAt: user.createdAt
        });
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      setError(null);
      
      const userType = localStorage.getItem('userType') as 'organizer' | 'supplier';
      if (!userType) throw new Error('User type not found');

      const { organizerAPI, supplierAPI } = await import('../../../services/api.js');
      
      // Update profile via API
      if (userType === 'organizer') {
        await organizerAPI.updateProfile(updates);
      } else {
        await supplierAPI.updateProfile(updates);
      }
      
      // Update local state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const value: ProfileContextType = {
    profile,
    loading,
    error,
    refreshProfile: loadProfile,
    updateProfile
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}