"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/footer/footer";
import { ProfileProvider } from "../contexts/ProfileContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      router.push('/auth/user-login');
      return;
    }
    
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#253C51]">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <ProfileProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </ProfileProvider>
  );
}