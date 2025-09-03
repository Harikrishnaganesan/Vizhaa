import apiCall, { API_ENDPOINTS } from '../config/api.js';

// Authentication API
export const authAPI = {
  sendOTP: (phone, userType) => apiCall(API_ENDPOINTS.AUTH.SEND_OTP, {
    method: 'POST',
    body: JSON.stringify({ phone, userType })
  }),
  
  verifyOTP: (sessionId, otp, phone) => apiCall(API_ENDPOINTS.AUTH.VERIFY_OTP, {
    method: 'POST',
    body: JSON.stringify({ sessionId, otp, phone })
  }),
  
  organizerSignup: (data) => apiCall(API_ENDPOINTS.AUTH.ORGANIZER_SIGNUP, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  supplierSignup: (data) => apiCall(API_ENDPOINTS.AUTH.SUPPLIER_SIGNUP, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  login: (phone, password) => apiCall(API_ENDPOINTS.AUTH.LOGIN, {
    method: 'POST',
    body: JSON.stringify({ phone, password })
  }),
  
  forgotPassword: (phone) => apiCall(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
    method: 'POST',
    body: JSON.stringify({ phone })
  }),
  
  verifyPasswordResetOTP: (sessionId, otp, phone) => apiCall(API_ENDPOINTS.AUTH.VERIFY_PASSWORD_RESET_OTP, {
    method: 'POST',
    body: JSON.stringify({ sessionId, otp, phone })
  }),

  resetPassword: (sessionId, phone, newPassword) => apiCall(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
    method: 'POST',
    body: JSON.stringify({ sessionId, phone, newPassword })
  })
};

// Organizer API
export const organizerAPI = {
  getDashboard: () => apiCall(API_ENDPOINTS.ORGANIZER.DASHBOARD),
  
  // Profile Management
  getProfile: () => apiCall(API_ENDPOINTS.ORGANIZER.PROFILE),
  updateProfile: (profileData) => apiCall(API_ENDPOINTS.ORGANIZER.PROFILE, {
    method: 'PUT',
    body: JSON.stringify(profileData)
  }),
  
  // Event Management
  createEvent: (eventData) => apiCall(API_ENDPOINTS.ORGANIZER.EVENTS, {
    method: 'POST',
    body: JSON.stringify(eventData)
  }),
  
  getEvents: () => apiCall(API_ENDPOINTS.ORGANIZER.EVENTS),
  
  updateEvent: (eventId, eventData) => apiCall(`${API_ENDPOINTS.ORGANIZER.EVENTS}/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(eventData)
  }),
  
  deleteEvent: (eventId) => apiCall(`${API_ENDPOINTS.ORGANIZER.EVENTS}/${eventId}`, {
    method: 'DELETE'
  }),
  
  // Supplier Management
  getEventSuppliers: (eventId) => apiCall(API_ENDPOINTS.ORGANIZER.EVENT_SUPPLIERS(eventId)),
  
  // Booking Management
  getBookings: () => apiCall(API_ENDPOINTS.ORGANIZER.BOOKINGS),
  
  updateBookingStatus: (bookingId, status, message) => apiCall(API_ENDPOINTS.ORGANIZER.BOOKING_STATUS(bookingId), {
    method: 'PUT',
    body: JSON.stringify({ status, organizerMessage: message })
  }),
  
  getBookingDetails: (bookingId) => apiCall(API_ENDPOINTS.ORGANIZER.BOOKING_DETAILS(bookingId))
};

// Supplier API
export const supplierAPI = {
  getDashboard: () => apiCall(API_ENDPOINTS.SUPPLIER.DASHBOARD),
  
  // Profile Management
  getProfile: () => apiCall(API_ENDPOINTS.SUPPLIER.PROFILE),
  updateProfile: (profileData) => apiCall(API_ENDPOINTS.SUPPLIER.PROFILE, {
    method: 'PUT',
    body: JSON.stringify(profileData)
  }),
  
  // View ALL events from ALL organizers
  getAvailableEvents: () => apiCall(API_ENDPOINTS.SUPPLIER.EVENTS),
  
  // Book event with services and pricing
  bookEvent: (eventId, bookingData) => apiCall(API_ENDPOINTS.SUPPLIER.BOOK_EVENT(eventId), {
    method: 'POST',
    body: JSON.stringify(bookingData)
  }),
  
  // View my bookings
  getBookings: () => apiCall(API_ENDPOINTS.SUPPLIER.BOOKINGS)
};