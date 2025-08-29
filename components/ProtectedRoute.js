import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredUserType }) => {
  const token = localStorage.getItem('authToken');
  const userType = localStorage.getItem('userType');
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  if (requiredUserType && userType !== requiredUserType) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};

export default ProtectedRoute;