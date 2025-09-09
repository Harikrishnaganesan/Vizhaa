"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SupplierDashboard from './dashboard';

export default function SupplierDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'supplier') {
      router.push('/auth/user-login');
    }
  }, [router]);

  return <SupplierDashboard />;
}