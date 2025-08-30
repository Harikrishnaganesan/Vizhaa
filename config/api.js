// Determine API URL based on environment
const getApiBaseUrl = () => {
  // Use proxy route for deployed sites to avoid CORS
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:4000/api';
    }
    // Use Next.js proxy route for deployed sites
    return '/api';
  }
  
  // Server-side: use direct API URL
  return process.env.NEXT_PUBLIC_API_URL || 'https://vizhaa-backend-1.onrender.com/api';
};

const API_BASE_URL = getApiBaseUrl();

// Get the correct base path for API calls
const getApiPath = (endpoint) => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return endpoint; // Direct endpoint for localhost
    }
    return endpoint; // Use proxy for production
  }
  return endpoint;
};

export const API_ENDPOINTS = {
  AUTH: {
    SEND_OTP: getApiPath('/auth/send-otp'),
    VERIFY_OTP: getApiPath('/auth/verify-otp'),
    ORGANIZER_SIGNUP: getApiPath('/auth/organizer/signup'),
    SUPPLIER_SIGNUP: getApiPath('/auth/supplier/signup'),
    LOGIN: getApiPath('/auth/login'),
    FORGOT_PASSWORD: getApiPath('/auth/forgot-password'),
    VERIFY_PASSWORD_RESET_OTP: getApiPath('/auth/verify-password-reset-otp'),
    RESET_PASSWORD: getApiPath('/auth/reset-password'),
  },
  ORGANIZER: {
    DASHBOARD: getApiPath('/organizer/dashboard'),
    EVENTS: getApiPath('/organizer/events'),
    EVENT_SUPPLIERS: (eventId) => getApiPath(`/organizer/events/${eventId}/suppliers`),
    BOOKINGS: getApiPath('/organizer/bookings'),
    BOOKING_STATUS: (bookingId) => getApiPath(`/organizer/bookings/${bookingId}/status`),
    BOOKING_DETAILS: (bookingId) => getApiPath(`/organizer/bookings/${bookingId}`),
  },
  SUPPLIER: {
    DASHBOARD: getApiPath('/supplier/dashboard'),
    EVENTS: getApiPath('/supplier/events'),
    BOOK_EVENT: (eventId) => getApiPath(`/supplier/events/${eventId}/book`),
    BOOKINGS: getApiPath('/supplier/bookings'),
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
    console.log('API Call:', `${API_BASE_URL}${endpoint}`);
    console.log('Request config:', config);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
      localStorage.removeItem('userId');
      window.location.href = '/login';
      return;
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', response.status, errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText || 'Network error' };
      }
      throw new Error(errorData.message || `HTTP ${response.status}: ${errorText}`);
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