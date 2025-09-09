// Error Handler Utility
export interface APIError {
  success: false;
  message: string;
  statusCode?: number;
}

export const handleAPIError = (error: any): string => {
  // Network errors
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Network connection failed. Please check your internet connection.';
  }
  
  // API errors with message
  if (error.message) {
    return error.message;
  }
  
  // Default error
  return 'An unexpected error occurred. Please try again.';
};

export const showErrorToast = (message: string) => {
  // You can integrate with a toast library here
  console.error('Error:', message);
};

export const showSuccessToast = (message: string) => {
  // You can integrate with a toast library here
  console.log('Success:', message);
};

// API Response validator
export const validateAPIResponse = (response: any): boolean => {
  return response && typeof response.success === 'boolean';
};

// Common error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed',
  UNAUTHORIZED: 'Please login to continue',
  FORBIDDEN: 'You do not have permission to perform this action',
  NOT_FOUND: 'Requested resource not found',
  SERVER_ERROR: 'Server error occurred. Please try again later',
  VALIDATION_ERROR: 'Please check your input and try again'
};