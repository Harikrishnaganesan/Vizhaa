export const handleAPIError = (error) => {
  if (error.message.includes('token')) {
    localStorage.clear();
    window.location.href = '/login';
  }
  return error.message || 'Something went wrong';
};