import { useState, useCallback } from 'react';

interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

interface APIState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useAPI = <T = any>() => {
  const [state, setState] = useState<APIState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async (apiCall: () => Promise<APIResponse<T>>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiCall();
      
      if (result.success) {
        setState({
          data: result.data || null,
          loading: false,
          error: null
        });
        return { success: true, data: result.data };
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: result.message || 'Operation failed'
        }));
        return { success: false, message: result.message };
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Network error occurred';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      return { success: false, message: errorMessage };
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null
    });
  }, []);

  return {
    ...state,
    execute,
    reset
  };
};

// Specific hooks for different API operations
export const useAuth = () => {
  const api = useAPI();
  
  const login = async (phone: string, password: string) => {
    const { authAPI } = await import('../services/api.js');
    return api.execute(() => authAPI.login(phone, password));
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    window.location.href = '/auth/user-login';
  };

  return {
    ...api,
    login,
    logout
  };
};

export const useEvents = () => {
  const api = useAPI();

  const createEvent = async (eventData: any) => {
    const { eventsAPI } = await import('../services/api.js');
    return api.execute(() => eventsAPI.createEvent(eventData));
  };

  const getEvents = async () => {
    const { eventsAPI } = await import('../services/api.js');
    return api.execute(() => eventsAPI.getAllEvents());
  };

  const updateEvent = async (eventId: string, eventData: any) => {
    const { eventsAPI } = await import('../services/api.js');
    return api.execute(() => eventsAPI.updateEvent(eventId, eventData));
  };

  const deleteEvent = async (eventId: string) => {
    const { eventsAPI } = await import('../services/api.js');
    return api.execute(() => eventsAPI.deleteEvent(eventId));
  };

  return {
    ...api,
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
  };
};

export const useSupplier = () => {
  const api = useAPI();

  const getDashboard = async () => {
    const { supplierAPI } = await import('../services/api.js');
    return api.execute(() => supplierAPI.getDashboard());
  };

  const getAvailableEvents = async () => {
    const { eventsAPI } = await import('../services/api.js');
    return api.execute(() => eventsAPI.getAvailableEvents());
  };

  const bookEvent = async (eventId: string, message: string) => {
    const { eventsAPI } = await import('../services/api.js');
    return api.execute(() => eventsAPI.bookEvent(eventId, message));
  };

  return {
    ...api,
    getDashboard,
    getAvailableEvents,
    bookEvent
  };
};

export const useOrganizer = () => {
  const api = useAPI();

  const getDashboard = async () => {
    const { organizerAPI } = await import('../services/api.js');
    return api.execute(() => organizerAPI.getDashboard());
  };

  const getBookings = async () => {
    const { organizerAPI } = await import('../services/api.js');
    return api.execute(() => organizerAPI.getBookings());
  };

  return {
    ...api,
    getDashboard,
    getBookings
  };
};