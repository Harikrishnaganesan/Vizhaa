"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import HeroSection from "../components/HomePageComponent/HeroSection";
import SecondSection from "../components/HomePageComponent/SecondSection";
import LaptopSection from "../components/HomePageComponent/LaptopSection";
import CountReview from "../components/HomePageComponent/CountReview";
import ReviewSection from "../components/HomePageComponent/ReviewSection";
import Download from "../components/HomePageComponent/Download";
import Footer from "../components/Footer/footer";
import { ProfileProvider } from "../contexts/ProfileContext";

export default function UserDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userType || !userId) {
      router.push('/auth/user-login');
      return;
    }
    
    // Redirect to appropriate dashboard based on user type
    if (userType === 'organizer') {
      router.push('/event-organizers');
      return;
    } else if (userType === 'supplier') {
      router.push('/supplier-dashboard');
      return;
    }
    
    // Ensure user data is properly initialized
    const initializeUserData = async () => {
      try {
        const { organizerAPI, supplierAPI } = await import('../../../services/api.js');
        
        const dashboardData = userType === 'organizer' 
          ? await organizerAPI.getDashboard()
          : await supplierAPI.getDashboard();
        
        const user = userType === 'organizer' ? dashboardData.organizer : dashboardData.supplier;
        
        if (user) {
          // Store user data in localStorage for quick access
          localStorage.setItem('userName', user.fullName || user.name || 'User');
          localStorage.setItem('userEmail', user.email || '');
          localStorage.setItem('userPhone', user.phone || '');
        }
      } catch (error) {
        console.error('Failed to initialize user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initializeUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-gray-900 text-lg font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <ProfileProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <HeroSection />
        <SecondSection />
        <LaptopSection />
        <CountReview />
        <ReviewSection />
        <Download />
        <Footer />
      </div>
    </ProfileProvider>
  );
}