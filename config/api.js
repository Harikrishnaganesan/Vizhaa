// Determine API URL based on environment
const getApiBaseUrl = () => {
  // Use proxy route for deployed sites to avoid CORS
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3001/api';
    }
    // Use Next.js proxy route for deployed sites
    return '/api';
  }
  
  // Server-side: use direct API URL
  return process.env.NEXT_PUBLIC_API_URL || 'https://vizhaa-backend-1.onrender.com/api';
};

const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  AUTH: {
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    ORGANIZER_SIGNUP: '/auth/organizer/signup',
    SUPPLIER_SIGNUP: '/auth/supplier/signup',
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_PASSWORD_RESET_OTP: '/auth/verify-password-reset-otp',
    RESET_PASSWORD: '/auth/reset-password',
  },
  ORGANIZER: {
    DASHBOARD: '/organizer/dashboard',
    EVENTS: '/organizer/events',
    EVENT_SUPPLIERS: (eventId) => `/organizer/events/${eventId}/suppliers`,
    BOOKINGS: '/organizer/bookings',
    BOOKING_STATUS: (bookingId) => `/organizer/bookings/${bookingId}/status`,
    BOOKING_DETAILS: (bookingId) => `/organizer/bookings/${bookingId}`,
  },
  SUPPLIER: {
    DASHBOARD: '/supplier/dashboard',
    EVENTS: '/supplier/events',
    BOOK_EVENT: (eventId) => `/supplier/events/${eventId}/book`,
    BOOKINGS: '/supplier/bookings',
  },
};

const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const config = {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  try {
    console.log('API Call:', `${API_BASE_URL}${endpoint}`, config);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
      localStorage.removeItem('userId');
      window.location.href = '/login';
      return;
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'API Error');
    }
    
    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network connection failed. Please check your internet connection.');
    }
    throw error;
  }
};

export default apiCall;
export { API_BASE_URL };