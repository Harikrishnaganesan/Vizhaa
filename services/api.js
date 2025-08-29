import apiCall from '../config/api.js';

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

// Organizer API
export const organizerAPI = {
  getDashboard: () => apiCall('/organizer/dashboard'),
  
  createEvent: (eventData) => apiCall('/organizer/events', {
    method: 'POST',
    body: JSON.stringify(eventData)
  }),
  
  getEvents: () => apiCall('/organizer/events'),
  
  getEventSuppliers: (eventId) => apiCall(`/organizer/events/${eventId}/suppliers`),
  
  getBookings: () => apiCall('/organizer/bookings'),
  
  updateBookingStatus: (bookingId, status, message) => apiCall(`/organizer/bookings/${bookingId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, organizerMessage: message })
  }),
  
  getBookingDetails: (bookingId) => apiCall(`/organizer/bookings/${bookingId}`)
};

// Supplier API
export const supplierAPI = {
  getDashboard: () => apiCall('/supplier/dashboard'),
  
  getAvailableEvents: () => apiCall('/supplier/events'),
  
  bookEvent: (eventId, bookingData) => apiCall(`/supplier/events/${eventId}/book`, {
    method: 'POST',
    body: JSON.stringify(bookingData)
  }),
  
  getBookings: () => apiCall('/supplier/bookings')
};