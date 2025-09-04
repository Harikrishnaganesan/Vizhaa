"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const SecondSection = () => {
  const [showContent, setShowContent] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Add scroll listener for animation trigger
    const handleScroll = () => {
      const element = document.getElementById('second-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !animateElements) {
          setAnimateElements(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animateElements]);

  return (
    <section
      id="second-section"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-white overflow-hidden " // Added mt-5 (20px) here
    >
      {/* Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Bubble 1 */}
        <div className={`absolute top-20 left-1/4 w-4 h-4 bg-green-300 rounded-full opacity-60 transition-all duration-3000 ${
          animateElements ? 'animate-bounce' : ''
        }`} style={{ animationDuration: '3s', animationDelay: '0s' }}></div>
        
        {/* Bubble 2 */}
        <div className={`absolute top-1/3 right-1/3 w-6 h-6 bg-green-200 rounded-full opacity-40 transition-all duration-4000 ${
          animateElements ? 'animate-bounce' : ''
        }`} style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        
        {/* Bubble 3 */}
        <div className={`absolute bottom-1/4 left-1/3 w-3 h-3 bg-green-400 rounded-full opacity-50 transition-all duration-2500 ${
          animateElements ? 'animate-bounce' : ''
        }`} style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
        
        {/* Bubble 4 */}
        <div className={`absolute top-1/2 right-1/4 w-5 h-5 bg-green-300 rounded-full opacity-30 transition-all duration-3500 ${
          animateElements ? 'animate-bounce' : ''
        }`} style={{ animationDuration: '3.5s', animationDelay: '1.5s' }}></div>
        
        {/* Bubble 5 */}
        <div className={`absolute bottom-1/3 left-1/2 w-4 h-4 bg-green-200 rounded-full opacity-45 transition-all duration-3200 ${
          animateElements ? 'animate-bounce' : ''
        }`} style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}></div>
      </div>

      {/* Decorative SVGs - Background Design */}
      <Image
        src="/left-line.svg"
        alt="left-line"
        width={300}
        height={300}  
        className="absolute top-10 left-0 w-96 md:w-74 lg:w-82"
      />
      <Image
        src="/right-line.svg"
        alt="right-line"
        width={300}
        height={300}
        className="absolute top-10 right-[-60px]  w-96 md:w-74 lg:w-82"
      />

      <Image
        src="/red-ball.svg"
        alt="red-ball-top"
        width={100}
        height={100}  
        className={`absolute top-20 left-[-40px] w-25 md:w-25 transition-all duration-1000 ${
          animateElements ? 'animate-spin' : ''
        }`}
        style={{ animationDuration: '8s' }}
      />
      <Image
        src="/red-ball.svg"
        alt="red-ball-bottom"
        width={100}
        height={100}
        className={`absolute bottom-43 right-[-40px] w-25 md:w-25 transition-all duration-1000 ${
          animateElements ? 'animate-spin' : ''
        }`}
        style={{ animationDuration: '8s' }}
      />

      <Image
        src="/flower.svg"
        alt="flower"
        width={100}
        height={100}
        className={`absolute bottom-0 left-[-250px] w-40 md:w-80 transition-all duration-2000 ${
          animateElements ? 'translate-x-32 opacity-100' : 'translate-x-0 opacity-0'
        }`}
        style={{ animationDuration: '1.5s', animationIterationCount: '1' }}
      />

      {/* Center Content */}
      <div
        className={`text-center max-w-4xl transition-all duration-1000 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green-600 mb-1 leading-tight">
          Better events for <br /> more people.
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-500 leading-loose">
          For every celebration, we connect the right people <br />
          so organizers can focus on what truly matters.
        </p>
      </div>
    </section>
  );
};

export default SecondSection;