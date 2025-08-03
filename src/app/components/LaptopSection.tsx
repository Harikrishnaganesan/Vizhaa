"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Laptop = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Staggered animation when component mounts
    const timers = [
      setTimeout(() => setCurrentStep(1), 500),  // Show laptop
      setTimeout(() => setCurrentStep(2), 900),  // Show left hand
      setTimeout(() => setCurrentStep(3), 1300), // Show right hand
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Calculate which elements should be visible based on current step
  const showLaptop = currentStep >= 1;
  const showLeftHand = currentStep >= 2;
  const showRightHand = currentStep >= 3;

  return (
    <section 
      className="w-full flex flex-col items-center justify-center py-[3px] px-8 mb-16"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Laptop illustration */}
        <div className={`relative z-10 transition-all duration-1000 ${
          showLaptop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Image
            src="/laptop.png"
            alt="Laptop"
            width={700}
            height={420}
            className="mx-auto"
            priority
          />
          {/* Screen content overlay */}
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[480px] h-[250px] flex flex-col items-center justify-center text-center bg-transparent">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-3">
              What will you discover<br />inside the app?
            </h2>
            
            <p className="text-gray-700 text-lg md:text-xl">
              From booking top-rated event workers<br />
              to managing tasks everything you need<br />
              right at your fingertips
            </p>
          </div>
        </div>
        {/* Hands holding phones, animated shake, overlapping the laptop */}
        <div className={`absolute -left-40 top-72 -translate-y-1/2 z-2 flex flex-col items-center transition-all duration-1000 ${
          showLeftHand ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}>
          <div className="relative origin-bottom animate-swing-left">
            <Image
              src="/left-hand.png"
              alt="Left Hand"
              width={280}
              height={260}
              className=""
              priority
            />
          </div>
        </div>
        <div className={`absolute -right-40 top-72 -translate-y-1/2 z-2 flex flex-col items-center transition-all duration-1000 ${
          showRightHand ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          <div className="relative origin-bottom animate-swing-right">
            <Image
              src="/right-hand.png"
              alt="Right Hand"
              width={280}
              height={260}
              className=""
              priority
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes swing-left {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(-28deg); }
        }
        @keyframes swing-right {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(25deg); }
        }
        .animate-swing-left {
          animation: swing-left 3s infinite;
          transform-origin: bottom center;
        }
        .animate-swing-right {
          animation: swing-right 3s infinite;
          transform-origin: bottom center;
        }
      `}</style>
    </section>
  );
};

export default Laptop;
