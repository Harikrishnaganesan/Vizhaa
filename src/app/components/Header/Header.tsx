"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const type = localStorage.getItem('userType');
    setIsLoggedIn(!!token);
    setUserType(type);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserType(null);
    router.push('/auth/user-login');
  }, [router]);

  const dashboardLink = useMemo(() => {
    if (!isLoggedIn) return '/auth/user-login';
    return userType === 'supplier' ? '/supplier-dashboard' : '/event-organizers';
  }, [isLoggedIn, userType]);

  const dashboardLabel = useMemo(() => {
    if (!isLoggedIn) return 'Dashboard';
    return userType === 'supplier' ? 'Supplier Dashboard' : 'Event Organizer Dashboard';
  }, [isLoggedIn, userType]);
  return (
    <header className="w-full z-50" aria-label="Main site header">
      {/* Top black bar */}
      <div className="w-full bg-black h-8 flex items-center justify-end px-3 sm:px-6">
        <span className="flex items-center gap-1 text-white text-xs sm:text-sm">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="white"/>
          </svg>
          <span aria-label="Location">Coimbatore</span>
        </span>
      </div>
      {/* Main white bar */}
      <div className="w-full bg-white flex flex-col sm:flex-row items-center justify-between px-2 sm:px-8 py-4 sm:py-6 shadow relative" style={{ minHeight: '70px' }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-10 min-w-[90px] mb-2 sm:mb-0" aria-label="Home">
          <Image src="/vizha-header-logo.svg" alt="Vizhaa Logo" width={110} height={30} className="h-8 w-auto sm:h-10" priority />
        </Link>
        {/* Navigation */}
        <nav className="flex flex-wrap gap-4 sm:gap-8 items-center justify-center flex-1 min-w-[180px] sm:min-w-[320px] text-xs sm:text-base ml-2 sm:ml-0 mb-2 sm:mb-0" aria-label="Main navigation">
          <Link href="/" className={`font-medium pb-1 transition-all ${pathname === "/" ? "border-b-2 border-[#22364A] text-[#22364A]" : "text-[#22364A] hover:text-[#2DBE60] hover:border-b-2 hover:border-[#2DBE60]"}`} aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
          <Link href="/how-it-works" className={`font-medium pb-1 transition-all ${pathname === "/how-it-works" ? "border-b-2 border-[#22364A] text-[#22364A]" : "text-[#22364A] hover:text-[#2DBE60] hover:border-b-2 hover:border-[#2DBE60]"}`} aria-current={pathname === "/how-it-works" ? "page" : undefined}>How It Works</Link>
          <Link href="/contact" className={`font-medium pb-1 transition-all ${pathname === "/contact" ? "border-b-2 border-[#22364A] text-[#22364A]" : "text-[#22364A] hover:text-[#2DBE60] hover:border-b-2 hover:border-[#2DBE60]"}`} aria-current={pathname === "/contact" ? "page" : undefined}>Contact</Link>
          <Link href={dashboardLink} className={`font-medium pb-1 transition-all ${pathname === dashboardLink ? "border-b-2 border-[#22364A] text-[#22364A]" : "text-[#22364A] hover:text-[#2DBE60] hover:border-b-2 hover:border-[#2DBE60]"}`}>{dashboardLabel}</Link>
        </nav>
        {/* Right side: Profile icon with hover menu */}
        <div className="flex items-center gap-4 sm:gap-6 relative z-10 mt-2 sm:mt-0 w-full sm:w-auto justify-center sm:justify-end">
          {/* Profile icon with hover menu */}
          <div className="relative group">
            <button className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#22364A] text-white border border-gray-200 hover:bg-[#2DBE60] hover:text-white transition focus:outline-none" aria-label="Profile menu">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            {/* Hover menu */}
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
              {isLoggedIn ? (
                <>
                  <Link href={dashboardLink} className="block px-5 py-3 text-[#22364A] hover:bg-[#F3F4F6] hover:text-[#2DBE60] font-medium transition" aria-label="Dashboard">Dashboard</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-5 py-3 text-[#22364A] hover:bg-[#F3F4F6] hover:text-[#2DBE60] font-medium transition" aria-label="Log out">Log out</button>
                </>
              ) : (
                <>
                  <Link href="/auth/user-login" className="block px-5 py-3 text-[#22364A] hover:bg-[#F3F4F6] hover:text-[#2DBE60] font-medium transition" aria-label="Log in">Log in</Link>
                  <Link href="/auth/role-selection" className="block px-5 py-3 text-[#22364A] hover:bg-[#F3F4F6] hover:text-[#2DBE60] font-medium transition" aria-label="Sign up">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
