"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// You can use FontAwesome for emoji, or Lottie for animation if you have the JSON
// For hand shake, we'll use CSS animation for up-down effect

const Laptop = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const totalSteps = 3; // laptop, left hand, right hand

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsScrollLocked(true);
          setCurrentStep(0);
        } else {
          setIsScrollLocked(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let scrollCount = 0;
    let lastWheelTime = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isScrollLocked && currentStep < totalSteps) {
        e.preventDefault();
        
        if (e.deltaY > 0) { // Scrolling down
          if (Date.now() - lastWheelTime > 500) {
            scrollCount = 0;
          }
          scrollCount++;
          lastWheelTime = Date.now();

          if (scrollCount >= 1 && currentStep < totalSteps) {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps));
            scrollCount = 0;
          }
        }
      }
    };

    const handleScroll = () => {
      if (currentStep >= totalSteps && isScrollLocked) {
        setIsScrollLocked(false);
      }
    };

    if (isScrollLocked) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollLocked, currentStep, totalSteps]);

  // Calculate which elements should be visible based on current step
  const showLaptop = currentStep >= 1;
  const showLeftHand = currentStep >= 2;
  const showRightHand = currentStep >= 3;

  return (
    <section 
      ref={sectionRef}
      className="w-full h-screen flex flex-col items-center justify-center py-12"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Laptop illustration */}
        <div className={`relative z-10 transition-all duration-1000 ${
          showLaptop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Image
            src="/laptop.png"
            alt="Laptop"
            width={500}
            height={300}
            className="mx-auto"
            priority
          />
          {/* Screen content overlay */}
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[340px] h-[180px] flex flex-col items-center justify-center text-center bg-transparent">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">
              What will you discover<br />inside the app?
            </h2>
            
            <p className="text-gray-700 text-base md:text-lg">
              From booking top-rated event workers<br />
              to managing tasks everything you need<br />
              right at your fingertips
            </p>
          </div>
        </div>
        {/* Hands holding phones, animated shake, overlapping the laptop */}
        <div className={`absolute -left-32 top-60 -translate-y-1/2 z-2 flex flex-col items-center transition-all duration-1000 ${
          showLeftHand ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}>
          <div className="relative origin-bottom animate-swing-left">
            <Image
              src="/left-hand.png"
              alt="Left Hand"
              width={210}
              height={200}
              className=""
              priority
            />
          </div>
        </div>
        <div className={`absolute -right-32 top-60 -translate-y-1/2 z-2 flex flex-col items-center transition-all duration-1000 ${
          showRightHand ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          <div className="relative origin-bottom animate-swing-right">
            <Image
              src="/right-hand.png"
              alt="Right Hand"
              width={210}
              height={200}
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
