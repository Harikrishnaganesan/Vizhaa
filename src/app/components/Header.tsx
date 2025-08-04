"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full flex items-center px-4 md:px-8 py-3 bg-white/90 backdrop-blur-md fixed top-0 left-0 z-50 shadow-sm">
      {/* Left: Desktop only */}
      <div className="hidden lg:flex items-center gap-6 flex-1">
        <div className="flex items-center gap-1 text-green-600 font-medium cursor-pointer hover:text-green-700">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="currentColor"/></svg>
          <span>Coimbatore</span>
        </div>
        <div>
          <button className="flex items-center gap-1 text-gray-700 font-medium hover:text-green-600">
            Event
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
      {/* Center: Logo */}
      <div className="flex-1 flex justify-center lg:justify-center">
        <Image 
          src="/logo.svg" 
          alt="Logo" 
          width={130} // Reduced for mobile friendliness
          height={38} 
          className="h-9 md:h-12 w-auto" 
          priority 
        />
      </div>
      {/* Right: Desktop nav */}
      <div className="hidden lg:flex items-center justify-end gap-6 flex-1">
        <nav className="flex gap-6 text-gray-700 font-medium">
          <Link
            href="/"
            className={`transition-all pb-1 ${pathname === "/" ? "border-b-2 border-green-600 text-green-600" : "border-b-2 border-transparent hover:border-green-600 hover:text-green-600"}`}
          >
            Home
          </Link>
          <Link
            href="/howwork"
            className={`transition-all pb-1 ${pathname === "/howwork" ? "border-b-2 border-green-600 text-green-600" : "border-b-2 border-transparent hover:border-green-600 hover:text-green-600"}`}
          >
            How It Works
          </Link>
          <Link
            href="/contact"
            className={`transition-all pb-1 ${pathname === "/contact" ? "border-b-2 border-green-600 text-green-600" : "border-b-2 border-transparent hover:border-green-600 hover:text-green-600"}`}
          >
            Contact
          </Link>
        </nav>
        <Link href="/login" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full shadow transition">
          Log in/Sign up
        </Link>
      </div>
      {/* Mobile: Hamburger */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-700 hover:text-green-600"
          aria-label="Toggle menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>
      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] z-50 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200 w-full h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col py-6 px-5">
            {/* Location/Event row */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-1 text-green-600 font-medium text-base">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="currentColor"/>
                </svg>
                <span>Coimbatore</span>
              </div>
              <button className="flex items-center gap-1 text-gray-700 font-medium text-base">
                Event
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            {/* Mobile Nav */}
            <nav className="flex flex-col gap-4 mb-8">
              <Link
                href="/"
                className={`text-lg font-medium py-2 ${pathname === "/" ? "text-green-600" : "text-gray-700 hover:text-green-600"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >Home</Link>
              <Link
                href="/howwork"
                className={`text-lg font-medium py-2 ${pathname === "/howwork" ? "text-green-600" : "text-gray-700 hover:text-green-600"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >How It Works</Link>
              <Link
                href="/contact"
                className={`text-lg font-medium py-2 ${pathname === "/contact" ? "text-green-600" : "text-gray-700 hover:text-green-600"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >Contact</Link>
            </nav>
            {/* Mobile CTA */}
            <Link
              href="/login"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full shadow text-center transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Log in/Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
