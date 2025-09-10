// Direct backend API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? 'https://vizhaa-backend-1.onrender.com/api'
    : 'http://localhost:4000/api');

// Health check function
const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Accept': 'application/json' }
    });
    return response.ok;
  } catch (error) {
    console.warn('Backend health check failed:', error);
    return false;
  }
};

const apiCall = async (endpoint, options = {}, retries = 2) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    mode: 'cors',
    credentials: 'omit',
    ...options
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      console.log(`API Call (attempt ${attempt + 1}): ${config.method} ${API_BASE_URL}${endpoint}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userType');
            localStorage.removeItem('userId');
            window.location.href = '/auth/user-login';
          }
          throw new Error('Session expired. Please login again.');
        }
        
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`API Response:`, data);
      
      if (data.success === false) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error(`API Error for ${endpoint} (attempt ${attempt + 1}):`, error);
      
      if (attempt === retries) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout: Server is taking too long to respond.');
        }
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          throw new Error('Network error: Unable to connect to server. The backend service may be starting up or unavailable.');
        }
        throw error;
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
};

// Wake up backend (for Render free tier)
const wakeUpBackend = async () => {
  try {
    const response = await fetch('https://vizhaa-backend-1.onrender.com/health', { 
      method: 'GET',
      mode: 'cors'
    });
    console.log('Backend wake-up successful:', response.ok);
    return response.ok;
  } catch (error) {
    console.log('Backend wake-up failed:', error.message);
    return false;
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
  
  login: async (phone, password) => {
    try {
      console.log('Attempting login...');
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ phone, password })
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }
      
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error.message || 'Login failed. Please try again.');
    }
  },
  
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