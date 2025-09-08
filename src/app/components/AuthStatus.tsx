"use client";
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthStatus: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Guest User</span>
        <a 
          href="/auth/user-login" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          Login
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user?.fullName?.charAt(0)?.toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.userType}</p>
        </div>
      </div>
      <button
        onClick={logout}
        className="text-sm text-red-600 hover:text-red-800"
      >
        Logout
      </button>
    </div>
  );
};

export default AuthStatus;