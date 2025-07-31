"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const SecondSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const totalSteps = 2; // text content, image

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

  const showText = currentStep >= 1;
  const showImage = currentStep >= 2;

  return (
    <section 
      ref={sectionRef}
      id="second-section" 
      className="w-full h-screen flex flex-col md:flex-row items-center justify-between px-8 bg-white"
    >
      {/* Left: Heading, subheading, icons */}
      <div className={`flex-1 flex flex-col items-start justify-center max-w-2xl transition-all duration-1000 ${
        showText ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}>
        <div className="flex items-center mb-2">
          <h2 className="text-4xl md:text-5xl font-bold text-green-600 mr-4 leading-tight">
            Better events for
            <br className="hidden md:block" />
            more people.
          </h2>
        </div>
        <p className="text-base md:text-lg text-gray-500 mb-4 mt-2">
          For every celebration, we connect the right people<br className="hidden md:block" />
          so organizers can focus on what truly matters.
        </p>
      </div>
      {/* Right: Large illustration (static image) */}
      <div className={`flex-1 flex justify-center items-center mt-8 md:mt-0 transition-all duration-1000 ${
        showImage ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      }`}>
        <Image
          src="/secondlottie.png"
          alt="Event Catering Illustration"
          width={400}
          height={300}
          className="w-72 h-72 md:w-[400px] md:h-[300px] object-contain"
          draggable={false}
        />
      </div>
    </section>
  );
};

export default SecondSection;
