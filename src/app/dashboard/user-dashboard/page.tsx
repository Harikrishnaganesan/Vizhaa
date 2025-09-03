"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "../../contexts/ProfileContext";

export default function UserDashboardPage() {
  const router = useRouter();
  const { profile } = useProfile();
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const type = localStorage.getItem('userType');
    
    if (!token) {
      router.push('/auth/user-login');
      return;
    }
    
    setUserType(type);
    setLoading(false);
    
    // Redirect to appropriate dashboard based on user type
    if (type === 'organizer') {
      router.push('/event-organizers');
    } else if (type === 'supplier') {
      router.push('/supplier-dashboard');
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Redirecting to {userType} dashboard...</p>
      </div>
    </div>
  );
}