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
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    setUser(null);
    router.push('/auth/user-login');
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // Update localStorage
      if (updates.fullName) localStorage.setItem('userName', updates.fullName);
      if (updates.email) localStorage.setItem('userEmail', updates.email);
      if (updates.phone) localStorage.setItem('userPhone', updates.phone);
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