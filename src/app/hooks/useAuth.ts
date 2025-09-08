"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  userType: 'organizer' | 'supplier';
  token: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        if (typeof window === 'undefined') {
          setUser(null);
          setLoading(false);
          return;
        }
        
        const token = localStorage.getItem('authToken');
        const userType = localStorage.getItem('userType') as 'organizer' | 'supplier';
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const userPhone = localStorage.getItem('userPhone');

        if (token && userType && userId) {
          setUser({
            id: userId,
            fullName: userName || 'User',
            email: userEmail || '',
            phone: userPhone || '',
            userType,
            token
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPhone');
      }
    } catch (error) {
      console.error('Error clearing auth data:', error);
    } finally {
      setUser(null);
      router.push('/auth/user-login');
    }
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // Update localStorage
      try {
        if (typeof window !== 'undefined') {
          if (updates.fullName) localStorage.setItem('userName', updates.fullName);
          if (updates.email) localStorage.setItem('userEmail', updates.email);
          if (updates.phone) localStorage.setItem('userPhone', updates.phone);
        }
      } catch (error) {
        console.error('Error updating user data in localStorage:', error);
      }
    }
  };

  return {
    user,
    loading,
    logout,
    updateUser,
    isAuthenticated: !!user
  };
}