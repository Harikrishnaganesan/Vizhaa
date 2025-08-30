
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // User is logged in, redirect to landing page
      router.push('/landing');
    } else {
      // User is not logged in, redirect to signup selection
      router.push('/signup/main');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#253C51]">
      <div className="text-white text-lg">Redirecting...</div>
    </div>
  );
}
