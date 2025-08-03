"use client";
import React, { useState, useEffect } from 'react';

const HeroWork: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleScroll = () => {
    const nextSection = document.getElementById("howwork-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="
        relative h-[90vh] w-full flex flex-col justify-center items-center
        bg-cover bg-center
        text-white
      "
        style={{ backgroundImage: 'url("/Howwork.png")' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Central Content */}
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
          Read
        </button>
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={handleScroll}
        className="absolute bottom-22 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 cursor-pointer hover:opacity-80 transition-opacity "
      >
        <span className="text-lg font-semibold">Scroll Down</span>
        <svg 
          className="w-6 h-6 mt-1 animate-bounce" 
          fill="none" stroke="currentColor" strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};



export default HeroWork;
