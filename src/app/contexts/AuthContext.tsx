"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  userType: 'organizer' | 'supplier' | 'user';
  gender?: string;
  dob?: string;
  isVerified: boolean;
  companyName?: string;
  services?: string[];
  aadharNumber?: string;
  aadharCard?: string;
  isApproved?: boolean;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    checkAuth();
  }, []);

  const clearAuthStorage = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
      }
    } catch (error) {
      console.error('Error clearing auth storage:', error);
    }
  };

  const checkAuth = async () => {
    try {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }
      
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      const { usersAPI } = await import('/services/api.js');
      const response = await usersAPI.getProfile();
      
      if (response.success) {
        setUser(response.data);
      } else {
        clearAuthStorage();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearAuthStorage();
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token: string, userData: User) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userType', userData.userType);
        localStorage.setItem('userId', userData.id);
      }
      setUser(userData);
    } catch (error) {
      console.error('Error saving auth data:', error);
      setUser(userData);
    }
  };

  const logout = () => {
    clearAuthStorage();
    setUser(null);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};