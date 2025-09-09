// Direct backend API service
import { backendApi } from './backendApi.js';

const authService = {
  sendOTP: (phone: string, userType: string = 'organizer') => backendApi.auth.sendOTP(phone, userType),
  verifyOTP: (sessionId: string, otp: string, phone: string) => backendApi.auth.verifyOTP(sessionId, otp, phone),
  resendOTP: (phone: string, userType: string = 'organizer') => backendApi.auth.sendOTP(phone, userType),
  completeRegistration: (userData: {userType: string; [key: string]: unknown}) => {
    if (userData.userType === 'organizer') {
      return backendApi.auth.organizerSignup(userData);
    } else {
      return backendApi.auth.supplierSignup(userData);
    }
  },
  login: (phone: string, password: string) => backendApi.auth.login(phone, password),
  forgotPassword: (phone: string) => backendApi.auth.forgotPassword(phone),
  resetPassword: (sessionId: string, phone: string, newPassword: string) => 
    backendApi.auth.resetPassword(sessionId, phone, newPassword)
};

export default authService;