// pages/HeroWork.tsx or components/HeroWork.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Righteous } from 'next/font/google';

const righteous = Righteous({
  subsets: ['latin'],
  weight: '400',
});

const HeroWork: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleScroll = () => {
    const nextSection = document.getElementById("second-section");
    if (nextSection) {
      const sectionPosition = nextSection.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div
      className="
        relative h-[90vh] w-full flex flex-col justify-center items-center
        bg-cover bg-center
        text-white
      "
      style={{ backgroundImage: 'url("/hero-contact.svg")' }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className={`relative z-10 flex flex-col items-center justify-center py-16 px-6 rounded-lg md:relative md:bottom-8 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-center transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Simplifying Events,<br />Empowering Talent
        </h1>
        <p className={`text-base sm:text-lg md:text-xl mb-7 text-center transition-all duration-1000 delay-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Organize Better. Supply Smarter. Celebrate Together.
        </p>
        <button
          onClick={handleScroll}
          className={`
            bg-yellow-400 hover:bg-yellow-500 
            text-black font-semibold 
            rounded 
            px-12 py-3 
            transition-all duration-1000 delay-700
            shadow-md
            focus:outline-none focus:ring-2 focus:ring-yellow-300
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          Contact Us
        </button>
      </div>

      {/* Scroll Down */}
      <button
        onClick={handleScroll}
        className="cursor-pointer animate-bounce text-white flex items-center absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 hover:opacity-80 transition-opacity"
      >
        <span className={`${righteous.className} text-white text-xl md:text-2xl`}>Scroll Down</span>
        <img
          src="/scroll-down.svg"
          alt="Scroll Down Icon"
          className="w-6 h-6 mt-1"
          draggable={false}
        />
      </button>
    </div>
  );
};

export default HeroWork;
