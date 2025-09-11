// Direct backend API service
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://vizhaa-backend-1.onrender.com/api'
  : 'http://localhost:4000/api';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
  user?: any;
}

class BackendApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('authToken');
    
    const config: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && !endpoint.includes('/auth/') && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
      // Add timeout
      signal: AbortSignal.timeout(15000) // 15 second timeout
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      // Check for network connectivity
      if (!response.ok) {
        if (response.status === 0) {
          throw new Error('Unable to connect to server. Please check your internet connection.');
        }
      }
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        window.location.href = '/auth/user-login';
        throw new Error('Unauthorized');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Authentication endpoints
  auth = {
    sendOTP: (phone: string, userType: string) =>
      this.request('/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ phone, userType }),
      }),

    verifyOTP: (sessionId: string, otp: string, phone: string) =>
      this.request('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ sessionId, otp, phone }),
      }),

    organizerSignup: (data: any) =>
      this.request('/auth/organizer/signup', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    supplierSignup: (data: any) =>
      this.request('/auth/supplier/signup', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    login: (phone: string, password: string) =>
      this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phone, password }),
      }),

    forgotPassword: (phone: string) =>
      this.request('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ phone }),
      }),

    verifyPasswordResetOTP: (sessionId: string, otp: string, phone: string) =>
      this.request('/auth/verify-password-reset-otp', {
        method: 'POST',
        body: JSON.stringify({ sessionId, otp, phone }),
      }),

    resetPassword: (sessionId: string, phone: string, newPassword: string) =>
      this.request('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ sessionId, phone, newPassword }),
      }),
  };

  // Events endpoints
  events = {
    create: (eventData: any) =>
      this.request('/events', {
        method: 'POST',
        body: JSON.stringify(eventData),
      }),

    getAll: () => this.request('/events'),

    getById: (id: string) => this.request(`/events/${id}`),

    update: (id: string, eventData: any) =>
      this.request(`/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify(eventData),
      }),

    delete: (id: string) =>
      this.request(`/events/${id}`, {
        method: 'DELETE',
      }),

    getAvailable: () => this.request('/events/available/events'),

    book: (eventId: string, message: string) =>
      this.request('/events/book', {
        method: 'POST',
        body: JSON.stringify({ eventId, message }),
      }),

    getApplications: (eventId: string) =>
      this.request(`/events/applications/${eventId}`),

    updateApplicationStatus: (bookingId: string, status: string) =>
      this.request(`/events/application/${bookingId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),

    getSupplierBookings: () => this.request('/events/supplier/bookings'),
  };

  // Organizer endpoints
  organizer = {
    getDashboard: () => this.request('/organizer/dashboard'),

    getEvents: () => this.request('/organizer/events'),

    createEvent: (eventData: any) =>
      this.request('/organizer/events', {
        method: 'POST',
        body: JSON.stringify(eventData),
      }),

    updateEvent: (eventId: string, eventData: any) =>
      this.request(`/organizer/events/${eventId}`, {
        method: 'PUT',
        body: JSON.stringify(eventData),
      }),

    deleteEvent: (eventId: string) =>
      this.request(`/organizer/events/${eventId}`, {
        method: 'DELETE',
      }),

    getEventSuppliers: (eventId: string) =>
      this.request(`/organizer/events/${eventId}/suppliers`),

    getBookings: () => this.request('/organizer/bookings'),

    updateBookingStatus: (bookingId: string, status: string, message?: string) =>
      this.request(`/organizer/bookings/${bookingId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status, organizerMessage: message }),
      }),

    getBookingDetails: (bookingId: string) =>
      this.request(`/organizer/bookings/${bookingId}`),
  };

  // Supplier endpoints
  supplier = {
    getDashboard: () => this.request('/supplier/dashboard'),

    getEvents: () => this.request('/supplier/events'),

    bookEvent: (eventId: string, message: string) =>
      this.request(`/supplier/events/${eventId}/book`, {
        method: 'POST',
        body: JSON.stringify({ message }),
      }),

    getBookings: () => this.request('/supplier/bookings'),
  };

  // Users endpoints
  users = {
    getProfile: () => this.request('/users/profile'),

    updateProfile: (profileData: any) =>
      this.request('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      }),
  };
}

export const backendApi = new BackendApiService();
export default backendApi;