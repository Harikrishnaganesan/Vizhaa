// API Base Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://vizhaa-backend-1.onrender.com/api'
  : 'http://localhost:4000/api';

// Direct API calls to backend
const getApiPath = (endpoint) => endpoint;

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
  EVENTS: {
    BASE: getApiPath('/events'),
    DETAIL: (id) => getApiPath(`/events/${id}`),
    AVAILABLE: getApiPath('/events/available/events'),
    BOOK: getApiPath('/events/book'),
    APPLICATIONS: (eventId) => getApiPath(`/events/applications/${eventId}`),
    APPLICATION_STATUS: (bookingId) => getApiPath(`/events/application/${bookingId}/status`),
    SUPPLIER_BOOKINGS: getApiPath('/events/supplier/bookings'),
  },
  ORGANIZER: {
    DASHBOARD: getApiPath('/organizer/dashboard'),
    PROFILE: getApiPath('/organizer/profile'),
    EVENTS: getApiPath('/organizer/events'),
    EVENT_SUPPLIERS: (eventId) => getApiPath(`/organizer/events/${eventId}/suppliers`),
    BOOKINGS: getApiPath('/organizer/bookings'),
    BOOKING_STATUS: (bookingId) => getApiPath(`/organizer/bookings/${bookingId}/status`),
    BOOKING_DETAILS: (bookingId) => getApiPath(`/organizer/bookings/${bookingId}`),
  },
  SUPPLIER: {
    DASHBOARD: getApiPath('/supplier/dashboard'),
    PROFILE: getApiPath('/supplier/profile'),
    EVENTS: getApiPath('/supplier/events'),
    BOOK_EVENT: (eventId) => getApiPath(`/supplier/events/${eventId}/book`),
    BOOKINGS: getApiPath('/supplier/bookings'),
  },
  USERS: {
    DASHBOARD: getApiPath('/users/dashboard'),
    PROFILE: getApiPath('/users/profile'),
  },
  OTP: {
    SEND: getApiPath('/otp/send'),
    VERIFY: getApiPath('/otp/verify'),
  },
};

// API Client with comprehensive error handling
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Handle different response types
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { success: false, message: await response.text() };
    }
    
    // Handle authentication errors
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
      localStorage.removeItem('userId');
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/user-login';
      }
      throw new Error('Session expired. Please login again.');
    }
    
    // Handle other HTTP errors
    if (!response.ok) {
      const errorMessage = data.message || getErrorMessage(response.status);
      throw new Error(errorMessage);
    }
    
    // Validate response structure
    if (!data || typeof data.success !== 'boolean') {
      throw new Error('Invalid response format from server');
    }
    
    return data;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network connection failed. Please check your internet connection.');
    }
    throw error;
  }
};

// Get user-friendly error messages based on status codes
const getErrorMessage = (status) => {
  switch (status) {
    case 400: return 'Invalid request. Please check your input.';
    case 401: return 'Authentication required. Please login.';
    case 403: return 'Access denied. You do not have permission.';
    case 404: return 'Resource not found.';
    case 409: return 'Conflict. Resource already exists.';
    case 422: return 'Validation failed. Please check your input.';
    case 429: return 'Too many requests. Please try again later.';
    case 500: return 'Server error. Please try again later.';
    case 502: return 'Service temporarily unavailable.';
    case 503: return 'Service maintenance. Please try again later.';
    default: return `Request failed with status ${status}`;
  }
};

export default apiCall;
export { API_BASE_URL };