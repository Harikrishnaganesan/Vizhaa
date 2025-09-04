import { useEffect } from 'react';
import { useRouter } from 'next/router';

const DashboardRouter = () => {
  const router = useRouter();
  
  useEffect(() => {
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      router.push('/login');
      return;
    }
    
    if (userType === 'organizer') {
      router.push('/dashboards/organizer');
    } else if (userType === 'supplier') {
      router.push('/dashboards/supplier');
    } else {
      // If userType is invalid, redirect to login
      router.push('/login');
    }
  }, []);
  
  // Return null or a loading spinner while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default DashboardRouter;
