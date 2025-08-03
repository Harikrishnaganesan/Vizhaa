"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const SecondSection = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after component mounts
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="second-section" 
      className="w-full min-h-screen flex flex-col items-center justify-center py-8 px-8 mb-16 bg-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/second bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Rotating Red Ball in Right Corner */}
      <div className="absolute top-170 right-[-110px] w-60 h-60 animate-spin pointer-events-none" style={{animationDuration: '10s'}}>
        <Image
          src="/10415249 4-2.png"
          alt="Rotating decorative ball"
          width={80}
          height={80}
          className="w-full h-full object-contain drop-shadow-lg"
          draggable={false}
        />
      </div>
      
      {/* Rotating left Ball in Left Corner */}
      <div className="absolute top-30 left-[-110px] w-60 h-60 animate-spin pointer-events-none" style={{animationDuration: '10s'}}>
        <Image
          src="/10415249 4-2.png"
          alt="Rotating decorative ball"
          width={80}
          height={80}
          className="w-full h-full object-contain drop-shadow-lg"
          draggable={false}
        />
      </div>
    
      {/* Centered Content */}
      <div className={`flex flex-col items-center justify-center text-center max-w-4xl transition-all duration-1000 ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-6xl md:text-6xl lg:text-7xl font-bold text-green-600 leading-tight">
            <span className="relative block">
              Better events for
              <span className="relative block">
                more people.
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4  rounded-full"></span>
              </span>
            </span>
          </h2>
        </div>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-500 mb-6 max-w-3xl">
          For every celebration, we connect the right <br /> people
          so organizers can focus on what<br />  truly matters.
        </p>
      </div>

    </section>
  );
};

export default SecondSection;
