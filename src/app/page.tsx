
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthenticationRedirectPage() {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // User is logged in, redirect to user dashboard
      router.push('/user-dashboard');
    } else {
      // User is not logged in, redirect to role selection
      router.push('/auth/role-selection');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#253C51] to-[#2A4F71]">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4 animate-pulse">
          <div className="text-2xl font-bold text-[#253C51]">V</div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Vizhaa</h1>
        <p className="text-blue-200 mb-6">Event Management Platform</p>
        
        <div className="flex justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
        
        <p className="text-white text-lg font-medium">Loading your experience...</p>
      </div>
    </div>
  );
}
