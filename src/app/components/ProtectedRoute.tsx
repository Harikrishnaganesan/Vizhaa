"use client";
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'organizer' | 'supplier' | 'user';
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredUserType,
  redirectTo = '/auth/user-login'
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (requiredUserType && user?.userType !== requiredUserType) {
        // Redirect to appropriate dashboard based on user type
        switch (user?.userType) {
          case 'organizer':
            router.push('/event-organizers');
            break;
          case 'supplier':
            router.push('/supplier-dashboard');
            break;
          default:
            router.push('/user-dashboard');
        }
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requiredUserType, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (requiredUserType && user?.userType !== requiredUserType) {
    return null; // Will redirect
  }

  return <>{children}</>;
};

export default ProtectedRoute;