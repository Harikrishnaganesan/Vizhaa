import React from "react";
import Image from "next/image";
import Link from 'next/link';


const Header = () => {
  return (
    <header className="w-full flex items-center px-8 py-4 bg-white/80 backdrop-blur-md fixed top-0 left-0 z-50 shadow-sm ">
      {/* Left: Location & Event */}
      <div className="flex items-center gap-6 flex-1">
        <div className="flex items-center gap-1 text-green-600 font-medium cursor-pointer">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="currentColor"/></svg>
          <span>Coimbatore</span>
        </div>
        <div className="relative">
          <button className="flex items-center gap-1 text-gray-700 font-medium focus:outline-none">
            Event
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
      {/* Center: Logo */}
      <div className="flex-1 flex justify-center">
        <Image src="/logo.svg" alt="Logo" width={180} height={48} className="h-12 w-auto" priority />
      </div>
      {/* Right: Nav & Button */}
      <div className="flex items-center justify-end gap-6 flex-1">
     <nav className="flex gap-6 text-gray-700 font-medium">
     <Link href="/" className="border-b-2 border-green-600 pb-1">Home</Link>
     <Link href="/howwork" className="hover:text-green-600">How It Works</Link>
     <Link href="/contact" className="hover:text-green-600">Contact</Link>
    </nav>
    <Link href="/login" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full shadow transition">
      Log in/Sign up
      </Link>
  </div>
    </header>
  );
};

export default Header;
