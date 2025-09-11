export interface User {
  id: string;
  phone: string;
  userType: 'organizer' | 'supplier' | 'user';
  name?: string;
  email?: string;
  isVerified: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  sessionId?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}