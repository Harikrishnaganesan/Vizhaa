// Alternative API configuration for lib folder
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    SEND_OTP: `${API_BASE_URL}/auth/send-otp`,
    VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },
  USERS: {
    DASHBOARD: `${API_BASE_URL}/users/dashboard`,
    PROFILE: `${API_BASE_URL}/users/profile`,
  },
  EVENTS: {
    CREATE: `${API_BASE_URL}/events`,
    LIST: `${API_BASE_URL}/events`,
    DETAIL: (id) => `${API_BASE_URL}/events/${id}`,
    STATS: `${API_BASE_URL}/events/stats`,
    AVAILABLE: `${API_BASE_URL}/events/available/events`,
    BOOK: `${API_BASE_URL}/events/book`,
  },
};

export default API_BASE_URL;