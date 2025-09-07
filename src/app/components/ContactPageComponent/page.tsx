// Contact Page Hero Section Component

"use client";
import React, { useState, useEffect } from 'react';
import { Righteous } from 'next/font/google';
import Image from 'next/image';

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
      const offset = 120;

      window.scrollTo({
        top: sectionPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative h-[70vh] sm:h-[80vh] lg:h-[90vh] w-full flex flex-col justify-center items-center text-white overflow-hidden">
      <Image
        src="/hero-contact.svg"
        alt="Hero background"
        fill
        style={{ objectFit: 'cover', zIndex: 0 }}
        priority
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/40 z-0" />
      
      <div className={`relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Simplifying Events,<br className="hidden sm:block" />
          <span className="sm:hidden"> </span>Empowering Talent
        </h1>
        
        <p className={`text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl leading-relaxed transition-all duration-1000 delay-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Organize Better. Supply Smarter. Celebrate Together.
        </p>
        
        <button
          onClick={handleScroll}
          className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-300 transform hover:scale-105 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-1000 delay-700`}
        >
          Contact Us
        </button>
      </div>

      <button
        onClick={handleScroll}
        className="absolute bottom-8 sm:bottom-12 lg:bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 text-white hover:opacity-80 transition-opacity animate-bounce"
      >
        <span className={`${righteous.className} text-base sm:text-lg lg:text-xl xl:text-2xl`}>Scroll Down</span>
        <Image
          src="/scroll-down.svg"
          alt="Scroll Down Icon"
          width={20}
          height={20}
          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
          draggable={false}
        />
      </button>
    </div>
  );
};

export default HeroWork;
