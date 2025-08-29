import { useState } from 'react';
import { authAPI } from '../services/api.js';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (phone, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authAPI.login(phone, password);
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userType', result.user.userType);
      localStorage.setItem('userId', result.user.id);
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
      const result = await authAPI.sendOTP(phone, userType);
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
      const result = await authAPI.verifyOTP(sessionId, otp, phone);
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
        ? await authAPI.organizerSignup(userData)
        : await authAPI.supplierSignup(userData);
      
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userType', userType);
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
    window.location.href = '/login';
  };

  return { login, signup, sendOTP, verifyOTP, logout, loading, error };
};