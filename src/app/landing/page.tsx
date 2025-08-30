"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const type = localStorage.getItem('userType');
    
    if (!token) {
      router.push('/login');
      return;
    }
    
    setUserType(type);
  }, [router]);

  const handleDashboardClick = () => {
    if (userType === 'supplier') {
      router.push('/supplier-dashboard');
    } else if (userType === 'organizer') {
      router.push('/event-organizers');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#253C51] to-[#2A4F71]">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image src="/vizha-header-logo.svg" alt="Vizhaa Logo" width={120} height={40} className="h-8 w-auto" />
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => router.push('/home')}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => router.push('/howwork')}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  How it Works
                </button>
                <button
                  onClick={() => router.push('/contact')}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Contact
                </button>
                <button
                  onClick={handleDashboardClick}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700 text-sm">Welcome back!</span>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="bg-gradient-to-b from-[#f8fafc] to-[#e6f7ef] rounded-2xl shadow-xl p-10 w-full max-w-4xl">
          <div className="text-center mb-8">
            <Image src="/openingcard-logo.svg" alt="Vizhaa Logo" width={120} height={60} className="mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Vizhaa</h1>
            <p className="text-gray-600">Choose your path to get started</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Navigation Cards */}
            <button
              onClick={() => router.push('/home')}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center border-2 border-transparent hover:border-green-400 transition group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-100 transition">
                <svg className="w-8 h-8 text-blue-600 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-800">Home</span>
              <span className="text-gray-600 text-sm mt-1">Explore our platform</span>
            </button>

            <button
              onClick={() => router.push('/howwork')}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center border-2 border-transparent hover:border-green-400 transition group"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-100 transition">
                <svg className="w-8 h-8 text-purple-600 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-800">How it Works</span>
              <span className="text-gray-600 text-sm mt-1">Learn about our process</span>
            </button>

            <button
              onClick={() => router.push('/contact')}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center border-2 border-transparent hover:border-green-400 transition group"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-100 transition">
                <svg className="w-8 h-8 text-orange-600 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-800">Contact</span>
              <span className="text-gray-600 text-sm mt-1">Get in touch with us</span>
            </button>

            <button
              onClick={handleDashboardClick}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center border-2 border-transparent hover:border-green-400 transition group"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-800">Dashboard</span>
              <span className="text-gray-600 text-sm mt-1">
                {userType === 'supplier' ? 'Supplier Dashboard' : 'Event Organizer Dashboard'}
              </span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Quick Actions</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => router.push('/home')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Explore Platform
              </button>
              <button
                onClick={handleDashboardClick}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}