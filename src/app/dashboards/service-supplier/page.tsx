"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ServiceSupplierDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'supplier') {
      router.push('/auth/user-login');
      return;
    }
    
    setUser({ userType });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    router.push('/auth/user-login');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Service Supplier Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Available Events</h3>
            <p className="text-gray-600 mb-4">Browse events to provide services</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              View Events
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">My Bookings</h3>
            <p className="text-gray-600 mb-4">Manage your event bookings</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              View Bookings
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Earnings</h3>
            <p className="text-gray-600 mb-4">Track your earnings and payments</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              View Earnings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}