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
  companyName?: string;
  location?: string;
  bio?: string;
  isVerified?: boolean;
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
          fullName: user.fullName || user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          userType,
          profilePicture: user.profilePicture || user.avatar,
          createdAt: user.createdAt,
          companyName: user.companyName || user.businessName,
          location: user.location || user.address,
          bio: user.bio || user.description,
          isVerified: user.isVerified || false
        });
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
      
      // If API fails, try to get basic info from localStorage as fallback
      const fallbackProfile = {
        id: userId || '',
        fullName: localStorage.getItem('userName') || 'User',
        email: localStorage.getItem('userEmail') || '',
        phone: localStorage.getItem('userPhone') || '',
        userType: userType || 'organizer' as 'organizer' | 'supplier'
      };
      
      if (fallbackProfile.id) {
        setProfile(fallbackProfile);
      }
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
        // Check if organizerAPI has updateProfile method, otherwise use a generic update
        if (organizerAPI.updateProfile) {
          await organizerAPI.updateProfile(updates);
        } else {
          console.warn('Update profile API not implemented for organizer');
        }
      } else {
        // Check if supplierAPI has updateProfile method, otherwise use a generic update
        if (supplierAPI.updateProfile) {
          await supplierAPI.updateProfile(updates);
        } else {
          console.warn('Update profile API not implemented for supplier');
        }
      }
      
      // Update local state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      // Update localStorage for fallback
      if (updates.fullName) localStorage.setItem('userName', updates.fullName);
      if (updates.email) localStorage.setItem('userEmail', updates.email);
      if (updates.phone) localStorage.setItem('userPhone', updates.phone);
      
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