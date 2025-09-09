// Unified API service for all components
import { backendApi } from './backendApi';

// Export the backend API as the main API service
export const apiService = backendApi;

// Export individual services for convenience
export const authService = backendApi.auth;
export const eventsService = backendApi.events;
export const organizerService = backendApi.organizer;
export const supplierService = backendApi.supplier;
export const usersService = backendApi.users;

export default apiService;