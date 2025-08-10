"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  // Header mode state: 'supplier' or 'organizer'
  const [headerMode, setHeaderMode] = useState(() => {
    if (pathname.startsWith("/supplier")) return "supplier";
    return "organizer";
  });
  const isSupplierMode = headerMode === "supplier";
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
        <Link href="/home" className="flex items-center gap-2 z-10 min-w-[90px] mb-2 sm:mb-0" aria-label="Home">
          <Image src="/vizha-header-logo.svg" alt="Vizhaa Logo" width={110} height={30} className="h-8 w-auto sm:h-10" priority />
        </Link>
        {/* Navigation */}
        <nav className="flex flex-wrap gap-4 sm:gap-8 items-center justify-center flex-1 min-w-[180px] sm:min-w-[320px] text-xs sm:text-base ml-2 sm:ml-0 mb-2 sm:mb-0" aria-label="Main navigation">
          <Link href="/home" className={`font-medium pb-1 transition-all ${pathname === "/home" ? "border-b-2 border-[#22364A] text-[#22364A]" : "text-[#22364A] hover:text-[#2DBE60] hover:border-b-2 hover:border-[#2DBE60]"}`} aria-current={pathname === "/home" ? "page" : undefined}>Home</Link>
          <Link href="/howwork" className={`font-medium pb-1 transition-all ${pathname === "/howwork" ? "border-b-2 border-[#22364A] text-[#22364A]" : "text-[#22364A] hover:text-[#2DBE60] hover:border-b-2 hover:border-[#2DBE60]"}`} aria-current={pathname === "/howwork" ? "page" : undefined}>How It Works</Link>
          <Link href="/contact" className={`font-medium pb-1 transition-all ${pathname === "/contact" ? "border-b-2 border-[#22364A] text-[#22364A]" : "text-[#22364A] hover:text-[#2DBE60] hover:border-b-2 hover:border-[#2DBE60]"}`} aria-current={pathname === "/contact" ? "page" : undefined}>Contact</Link>
          <Link href={pathname.startsWith("/supplier") ? "/supplier-dashboard" : "/event-organizers"} className={`font-medium pb-1 transition-all ${(pathname.startsWith("/supplier") && pathname === "/supplier-dashboard") || pathname === "/event-organizers" ? "border-b-2 border-[#22364A] text-[#22364A]" : "text-[#22364A] hover:text-[#2DBE60] hover:border-b-2 hover:border-[#2DBE60]"}`}>{pathname.startsWith("/supplier") ? "Supplier" : "Event Organizers"}</Link>
        </nav>
        {/* Right side: Change icon and profile icon with hover menu */}
        <div className="flex items-center gap-4 sm:gap-6 relative z-10 mt-2 sm:mt-0 w-full sm:w-auto justify-center sm:justify-end">
          {/* Change icon for toggling user view */}
          <button className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#22364A] transition group hover:bg-white hover:ring-2 hover:ring-[#2DBE60] hover:scale-110 hover:shadow-lg" title="Switch View" aria-label="Switch dashboard" onClick={() => { if (isSupplierMode) { setHeaderMode("organizer"); router.push("/event-organizers"); } else { setHeaderMode("supplier"); router.push("/supplier-dashboard"); } }}>
            <Image src="/change.svg" alt="Change View" width={24} height={24} className="w-6 h-6 sm:w-7 sm:h-7 transition" style={{ filter: 'invert(1) brightness(2)' }} onMouseOver={e => (e.currentTarget.style.filter = 'invert(47%) sepia(99%) saturate(749%) hue-rotate(88deg) brightness(1.2)')} onMouseOut={e => (e.currentTarget.style.filter = 'invert(1) brightness(2)')} />
          </button>
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
              <Link href="/login" className="block px-5 py-3 text-[#22364A] hover:bg-[#F3F4F6] hover:text-[#2DBE60] font-medium transition" aria-label="Log in">Log in</Link>
              <Link href="/signup/organizer" className="block px-5 py-3 text-[#22364A] hover:bg-[#F3F4F6] hover:text-[#2DBE60] font-medium transition" aria-label="Sign up">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
