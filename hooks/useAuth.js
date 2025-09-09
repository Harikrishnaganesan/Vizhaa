import { useState } from 'react';
import { backendApi } from '../src/services/backendApi.js';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (phone, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await backendApi.auth.login(phone, password);
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userType', result.user.userType);
      localStorage.setItem('userId', result.user.id);
      
      // Set cookie for middleware
      document.cookie = `authToken=${result.token}; path=/; max-age=86400; SameSite=Lax`;
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendOTP = async (phone, userType) => {
    setLoading(true);
    setError(null);
    try {
      const result = await backendApi.auth.sendOTP(phone, userType);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (sessionId, otp, phone) => {
    setLoading(true);
    setError(null);
    try {
      const result = await backendApi.auth.verifyOTP(sessionId, otp, phone);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData, userType) => {
    setLoading(true);
    setError(null);
    try {
      const result = userType === 'organizer' 
        ? await backendApi.auth.organizerSignup(userData)
        : await backendApi.auth.supplierSignup(userData);
      
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userType', userType);
      
      // Set cookie for middleware
      document.cookie = `authToken=${result.token}; path=/; max-age=86400; SameSite=Lax`;
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    // Clear cookie
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = '/login';
  };

  return { login, signup, sendOTP, verifyOTP, logout, loading, error };
};