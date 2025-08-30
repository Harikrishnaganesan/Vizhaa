"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/footer";
import Navigation from "./components/Navigation";
import { ProfileProvider } from "./contexts/ProfileContext";
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
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, [pathname]);
  
  const hideHeaderFooter = pathname === "/" || pathname.startsWith("/signup/organizer") || pathname.startsWith("/signup/supplier") || pathname.startsWith("/login") || pathname.startsWith("/event-organizers") || pathname.startsWith("/supplier-dashboard");
  const showNavigation = isAuthenticated && (pathname.startsWith("/home") || pathname.startsWith("/howwork") || pathname.startsWith("/contact") || pathname.startsWith("/event-organizers") || pathname.startsWith("/supplier-dashboard"));
  // Set background color for sign-up and login pages
  const isSignupOrLoginPage = pathname.startsWith("/signup/organizer") || pathname.startsWith("/signup/supplier") || pathname.startsWith("/login");
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased${isSignupOrLoginPage ? ' bg-[#253C51]' : ''}`}>
        <ProfileProvider>
          {showNavigation && <Navigation />}
          {!hideHeaderFooter && !showNavigation && <Header />}
          {children}
          {!hideHeaderFooter && !showNavigation && <Footer />}
        </ProfileProvider>
      </body>
    </html>
  );
}

export default LayoutWithConditionalHeaderFooter;
