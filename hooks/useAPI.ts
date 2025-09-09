import { useState, useCallback } from 'react';
import { backendApi } from '../src/services/backendApi';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useAPI<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (apiCall: () => Promise<any>) => {
    setState({ data: null, loading: true, error: null });
    
    try {
      const response = await apiCall();
      if (response.success) {
        setState({ data: response.data || response, loading: false, error: null });
        return response;
      } else {
        setState({ data: null, loading: false, error: response.message });
        throw new Error(response.message);
      }
    } catch (error: any) {
      setState({ data: null, loading: false, error: error.message });
      throw error;
    }
  }, []);

  return { ...state, execute };
}

// Specific hooks for different services
export const useAuth = () => {
  const { execute, ...state } = useAPI();
  
  return {
    ...state,
    sendOTP: (phone: string, userType: string) => execute(() => backendApi.auth.sendOTP(phone, userType)),
    verifyOTP: (sessionId: string, otp: string, phone: string) => execute(() => backendApi.auth.verifyOTP(sessionId, otp, phone)),
    login: (phone: string, password: string) => execute(() => backendApi.auth.login(phone, password)),
    organizerSignup: (data: any) => execute(() => backendApi.auth.organizerSignup(data)),
    supplierSignup: (data: any) => execute(() => backendApi.auth.supplierSignup(data)),
  };
};

export const useEvents = () => {
  const { execute, ...state } = useAPI();
  
  return {
    ...state,
    getAll: () => execute(() => backendApi.events.getAll()),
    getAvailable: () => execute(() => backendApi.events.getAvailable()),
    create: (eventData: any) => execute(() => backendApi.events.create(eventData)),
    book: (eventId: string, message: string) => execute(() => backendApi.events.book(eventId, message)),
  };
};

export const useOrganizer = () => {
  const { execute, ...state } = useAPI();
  
  return {
    ...state,
    getDashboard: () => execute(() => backendApi.organizer.getDashboard()),
    getEvents: () => execute(() => backendApi.organizer.getEvents()),
    createEvent: (eventData: any) => execute(() => backendApi.organizer.createEvent(eventData)),
    getBookings: () => execute(() => backendApi.organizer.getBookings()),
  };
};

export const useSupplier = () => {
  const { execute, ...state } = useAPI();
  
  return {
    ...state,
    getDashboard: () => execute(() => backendApi.supplier.getDashboard()),
    getEvents: () => execute(() => backendApi.supplier.getEvents()),
    bookEvent: (eventId: string, message: string) => execute(() => backendApi.supplier.bookEvent(eventId, message)),
    getBookings: () => execute(() => backendApi.supplier.getBookings()),
  };
};