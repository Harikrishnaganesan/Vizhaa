// Direct backend API calls
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://vizhaa-backend-1.onrender.com/api'
  : 'http://localhost:4000/api';

const apiCall = async (endpoint, options = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
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
    console.log(`API Call: ${config.method} ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        window.location.href = '/auth/user-login';
      }
      throw new Error('Session expired. Please login again.');
    }
    
    const data = await response.json();
    console.log(`API Response:`, data);
    
    if (data.success === false) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  sendOTP: (phone, userType) => apiCall('/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify({ phone, userType })
  }),
  
  verifyOTP: (sessionId, otp, phone) => apiCall('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ sessionId, otp, phone })
  }),
  
  organizerSignup: (data) => apiCall('/auth/organizer/signup', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  supplierSignup: (data) => apiCall('/auth/supplier/signup', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  login: (phone, password) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ phone, password })
  }),
  
  forgotPassword: (phone) => apiCall('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ phone })
  }),
  
  verifyPasswordResetOTP: (sessionId, otp, phone) => apiCall('/auth/verify-password-reset-otp', {
    method: 'POST',
    body: JSON.stringify({ sessionId, otp, phone })
  }),

  resetPassword: (sessionId, phone, newPassword) => apiCall('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ sessionId, phone, newPassword })
  })
};

// Events API
export const eventsAPI = {
  createEvent: (eventData) => apiCall('/events', {
    method: 'POST',
    body: JSON.stringify(eventData)
  }),
  
  getAllEvents: () => apiCall('/events'),
  
  getEventById: (eventId) => apiCall(`/events/${eventId}`),
  
  updateEvent: (eventId, eventData) => apiCall(`/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(eventData)
  }),
  
  deleteEvent: (eventId) => apiCall(`/events/${eventId}`, {
    method: 'DELETE'
  }),
  
  getAvailableEvents: () => apiCall('/events/available/events'),
  
  bookEvent: (eventId, message) => apiCall('/events/book', {
    method: 'POST',
    body: JSON.stringify({ eventId, message })
  }),
  
  getEventApplications: (eventId) => apiCall(`/events/applications/${eventId}`),
  
  updateApplicationStatus: (bookingId, status) => apiCall(`/events/application/${bookingId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  }),
  
  getSupplierBookings: () => apiCall('/events/supplier/bookings')
};

// Organizer API
export const organizerAPI = {
  getDashboard: () => apiCall('/organizer/dashboard'),
  
  // Event Management
  getEvents: () => apiCall('/organizer/events'),
  getEventsStatus: () => apiCall('/organizer/status'),
  createEvent: (eventData) => {
    console.log('Creating event with data:', eventData);
    return apiCall('/organizer/events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  },
  updateEvent: (eventId, eventData) => {
    console.log('Updating event:', eventId, eventData);
    return apiCall(`/organizer/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData)
    });
  },
  deleteEvent: (eventId) => {
    console.log('Deleting event:', eventId);
    return apiCall(`/organizer/events/${eventId}`, {
      method: 'DELETE'
    });
  },
  
  // Supplier Management
  getEventSuppliers: (eventId) => apiCall(`/organizer/events/${eventId}/suppliers`),
  
  // Booking Management
  getBookings: () => apiCall('/organizer/bookings'),
  updateBookingStatus: (bookingId, status, organizerMessage) => apiCall(`/organizer/bookings/${bookingId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, organizerMessage })
  }),
  getBookingDetails: (bookingId) => apiCall(`/organizer/bookings/${bookingId}`),
  
  // Profile Management
  getProfile: () => apiCall('/organizer/profile'),
  updateProfile: (profileData) => apiCall('/organizer/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  })
};

// Supplier API
export const supplierAPI = {
  getDashboard: () => apiCall('/supplier/dashboard'),
  
  // View Available Events
  getAvailableEvents: () => apiCall('/supplier/events'),
  
  // Book Event
  bookEvent: (eventId, bookingData) => {
    console.log('Booking event:', eventId, bookingData);
    return apiCall(`/supplier/events/${eventId}/book`, {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  },
  
  // View My Bookings
  getBookings: () => apiCall('/supplier/bookings')
};

// Users API
export const usersAPI = {
  getDashboard: () => apiCall('/users/dashboard'),
  getProfile: () => apiCall('/users/profile'),
  updateProfile: (profileData) => apiCall('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  })
};

// Auth Profile API (alternative endpoints)
export const authProfileAPI = {
  getProfile: () => apiCall('/auth/profile'),
  updateProfile: (profileData) => apiCall('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  })
};

// OTP API
export const otpAPI = {
  // Send OTP
  sendOTP: (phone, purpose) => apiCall('/otp/send', {
    method: 'POST',
    body: JSON.stringify({ phone, purpose })
  }),
  
  // Verify OTP
  verifyOTP: (sessionId, otp) => apiCall('/otp/verify', {
    method: 'POST',
    body: JSON.stringify({ sessionId, otp })
  })
};

// Health Check API
export const healthAPI = {
  // Health Check
  healthCheck: () => apiCall('/health'),
  
  // API Health Check
  apiHealthCheck: () => apiCall('/api/health'),
  
  // Database Test
  testDatabase: () => apiCall('/api/test-db')
};