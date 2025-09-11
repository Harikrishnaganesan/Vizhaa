// Complete API service with all endpoints
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://vizhaa-backend-1.onrender.com/api'
    : 'http://localhost:4000/api');

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
  user?: any;
  sessionId?: string;
  otp?: string;
  phoneVerified?: boolean;
  userType?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('authToken');
    
    const config: RequestInit = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
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
      console.error('API Request Error:', error);
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

    organizerSignup: (data: {
      phone: string;
      sessionId: string;
      fullName: string;
      email: string;
      password: string;
      companyName: string;
    }) =>
      this.request('/auth/organizer/signup', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    supplierSignup: (data: {
      phone: string;
      sessionId: string;
      fullName: string;
      email: string;
      password: string;
      services: string[];
    }) =>
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
    create: (eventData: {
      eventName: string;
      eventType: string;
      location: string;
      numberOfSuppliers: number;
      eventDate: string;
      eventTime: string;
      servicesNeeded: string[];
      budget: number;
      notes?: string;
    }) =>
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

    getAvailable: (params?: {
      page?: number;
      limit?: number;
      services?: string;
      location?: string;
    }) => {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.services) queryParams.append('services', params.services);
      if (params?.location) queryParams.append('location', params.location);
      
      const queryString = queryParams.toString();
      return this.request(`/events/available/events${queryString ? `?${queryString}` : ''}`);
    },

    book: (eventId: string, proposedBudget: number, notes?: string) =>
      this.request('/events/book', {
        method: 'POST',
        body: JSON.stringify({ eventId, proposedBudget, notes }),
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

    getProfile: () => this.request('/organizer/profile'),

    updateProfile: (profileData: any) =>
      this.request('/organizer/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      }),

    getEvents: () => this.request('/organizer/events'),

    createEvent: (eventData: {
      eventName: string;
      eventType: string;
      location: string;
      numberOfSuppliers: number;
      eventDate: string;
      eventTime: string;
      servicesNeeded: string[];
      budget: number;
      notes?: string;
    }) =>
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

    getProfile: () => this.request('/supplier/profile'),

    updateProfile: (profileData: any) =>
      this.request('/supplier/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      }),

    getEvents: (params?: {
      page?: number;
      limit?: number;
      services?: string;
      location?: string;
    }) => {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.services) queryParams.append('services', params.services);
      if (params?.location) queryParams.append('location', params.location);
      
      const queryString = queryParams.toString();
      return this.request(`/supplier/events${queryString ? `?${queryString}` : ''}`);
    },

    bookEvent: (eventId: string, bookingData: {
      proposedBudget: number;
      notes?: string;
    }) =>
      this.request(`/supplier/events/${eventId}/book`, {
        method: 'POST',
        body: JSON.stringify(bookingData),
      }),

    getBookings: () => this.request('/supplier/bookings'),
  };

  // Users endpoints
  users = {
    getDashboard: () => this.request('/users/dashboard'),

    getProfile: () => this.request('/users/profile'),

    updateProfile: (profileData: any) =>
      this.request('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      }),
  };

  // File upload for supplier registration
  uploadFile = async (formData: FormData) => {
    const token = localStorage.getItem('authToken');
    
    const config: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/supplier/signup`, config);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('File Upload Error:', error);
      throw error;
    }
  };

  // OTP endpoints (legacy support)
  otp = {
    send: (phone: string, purpose: string) =>
      this.request('/otp/send', {
        method: 'POST',
        body: JSON.stringify({ phone, purpose }),
      }),

    verify: (sessionId: string, otp: string) =>
      this.request('/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ sessionId, otp }),
      }),
  };
}

export const api = new ApiService();
export default api;