"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const stats = [
  {
    icon: "/section1.png",
    value: 5000,
    suffix: "+",
    label: "Verified Suppliers"
  },
  {
    icon: "/section2.png",
    value: 500,
    suffix: "+",
    label: "Cities Covered"
  },
  {
    icon: "/section-3.png",
    value: 10000,
    suffix: "+",
    label: "Events Posted"
  }
];

const CountReview = () => {
  const [counts, setCounts] = useState([0, 0, 0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const totalSteps = 1; // show counting animation

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsScrollLocked(true);
          setCurrentStep(0);
          if (!isVisible) {
            setIsVisible(true);
          }
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
  }, [isVisible]);

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

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000; // 2 seconds
        const increment = stat.value / (duration / 16); // 60 FPS
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(current);
            return newCounts;
          });
        }, 16);
      });
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="w-full h-screen flex items-center justify-center py-16 bg-white" 
      style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
    >
      <div className="flex flex-col md:flex-row gap-12 md:gap-54 items-center justify-center w-full max-w-6xl mx-auto ">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center min-w-[200px]">
            <Image src={stat.icon} alt={stat.label} width={200} height={200} className="mb-4" />
            <div className="text-4xl md:text-5xl font-bold text-[#223344] mb-1">
              {counts[idx].toLocaleString()}{stat.suffix}
            </div>
            <div className="text-[#223344] text-xl text-center font-semibold tracking-tight">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountReview;
