"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/footer";
import { ProfileProvider } from "./contexts/ProfileContext";
import { AuthProvider } from "./contexts/AuthContext";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




function LayoutWithConditionalHeaderFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setIsAuthenticated(false);
    }
  }, [pathname]);
  
  // Hide header/footer for auth pages and specific dashboards
  const hideHeaderFooter = 
    pathname.startsWith("/auth/") || 
    pathname.startsWith("/dashboard/") || 
    pathname.startsWith("/dashboards/") || 
    pathname.startsWith("/event-organizers") || 
    pathname.startsWith("/supplier-dashboard") || 
    pathname === "/user-dashboard" ||
    pathname === "/" ||
    pathname === "/how-it-works" ||
    pathname === "/contact";
    
  const showNavigation = false; // Navigation handled internally by pages
  
  const showHeaderFooter = !hideHeaderFooter && !showNavigation;
  
  // Set background color for auth pages
  const isAuthPage = pathname.startsWith("/auth/") || 
    pathname.startsWith("/signup") || 
    pathname.startsWith("/login") || 
    pathname === "/";
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased${isAuthPage ? ' bg-[#253C51]' : ''}`}>
        <AuthProvider>
          <ProfileProvider>
            {showHeaderFooter && <Header />}
            {children}
            {showHeaderFooter && <Footer />}

          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export default LayoutWithConditionalHeaderFooter;
