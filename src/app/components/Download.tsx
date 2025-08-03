"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const Download = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const totalSteps = 1; // show download section

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
        
        if (e.deltaY > 0) {
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

  return (
    <section 
      ref={sectionRef}
      className="w-full h-screen flex justify-center items-center py-16 bg-white relative"
    >
      <div className="relative bg-white rounded-[24px] shadow-xl px-2 md:px-32 py-14 flex flex-col md:flex-row items-center gap-10 md:gap-32 max-w-6xl w-full h-[400px] mx-auto border border-gray-100 z-10 overflow-hidden" style={{ minHeight: 340 }}>
        
        {/* ✅ Move shadow inside here */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-32 pointer-events-none z-0">
          <div className="w-full h-full rounded-b-3xl bg-gradient-to-b from-green-300/80 via-green-400/60 to-green-200/0 blur-[60px] opacity-90"></div>
        </div>

        {/* Left: Text and buttons */}
        <div className="flex-1 flex flex-col items-start justify-center text-center md:text-left z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#223344] mb-4 tracking-tight leading-tight">Download the app now!</h2>
          <p className="text-gray-500 text-xl md:text-2xl mb-8 font-medium">Your perfect event, just a tap away.</p>
          <div className="flex gap-6 mt-2">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image src="/google.png" alt="Get it on Google Play" width={238} height={73} className="h-[63px] w-auto" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image src="/Appstore.png" alt="Download on the App Store" width={238} height={73} className="h-[63px] w-auto" />
            </a>
          </div>
        </div>

        {/* Right: Phone with QR code */}
        <div className="flex-1 flex justify-center items-center z-10">
          <Image
            src="/mobile.png"
            alt="Download App Phone"
            width={160}
            height={380}
            className="drop-shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Download;
