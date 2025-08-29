// Compatibility layer for authService - redirects to proper API
import { authAPI } from '../../services/api.js';

const authService = {
  sendOTP: (phone: string, userType: string = 'organizer') => authAPI.sendOTP(phone, userType),
  verifyOTP: (sessionId: string, otp: string, phone: string) => authAPI.verifyOTP(sessionId, otp, phone),
  resendOTP: (phone: string, userType: string = 'organizer') => authAPI.sendOTP(phone, userType),
  completeRegistration: (userData: {userType: string; [key: string]: unknown}) => {
    if (userData.userType === 'organizer') {
      return authAPI.organizerSignup(userData);
    } else {
      return authAPI.supplierSignup(userData);
    }
  },
  login: (phone: string, password: string) => authAPI.login(phone, password),
  forgotPassword: (phone: string) => authAPI.forgotPassword(phone),
  resetPassword: (sessionId: string, phone: string, newPassword: string) => 
    authAPI.resetPassword(sessionId, phone, newPassword)
};

export default authService;