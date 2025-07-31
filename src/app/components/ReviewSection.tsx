"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const reviews = [
  {
    name: "John doe",
    avatar: "/avatar1.png",
    text: "I am absolutely thrilled with the service I received from their company! They were attentive, responsive, and genuinely cared about meeting my needs. I highly recommend them."
  },
  {
    name: "John doe",
    avatar: "/avatar2.png",
    text: "I am absolutely thrilled with the service I received from their company! They were attentive, responsive, and genuinely cared about meeting my needs. I highly recommend them."
  },
  {
    name: "John doe",
    avatar: "/avatar3.png",
    text: "I was impressed with the service I received from their company! They were responsive, and genuinely cared about meeting my needs. I highly recommend them."
  },
  {
    name: "John doe",
    avatar: "/avatar1.png",
    text: "Amazing experience! The team was professional and delivered exactly what we needed."
  },
  {
    name: "John doe",
    avatar: "/avatar2.png",
    text: "Outstanding service quality. They exceeded our expectations in every way possible."
  }
];

const ReviewSection = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const totalSteps = 1; // just show reviews
  
  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

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
  
  const getVisibleReviews = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide - 1 + i + reviews.length) % reviews.length;
      result.push({ ...reviews[index], isCenter: i === 1 });
    }
    return result;
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full h-screen py-16 bg-gray-200 flex flex-col items-center justify-center"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-green-600 mb-4 text-center">
          Our Client Review
        </h2>
        <p className="text-gray-600 text-center mb-12 text-lg">
          The reasons why people love us and become our partner.
        </p>
        
        <div className="relative overflow-hidden">
          <div className="flex justify-center items-center gap-8 min-h-[300px]">
            {getVisibleReviews().map((review, idx) => (
              <div
                key={`${currentSlide}-${idx}`}
                className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-all duration-500 ${
                  review.isCenter 
                    ? 'w-80 scale-110 z-10 border-2 border-green-400 shadow-2xl' 
                    : 'w-72 scale-95 opacity-60'
                }`}
              >
                <div className="relative mb-4">
                  <Image 
                    src={review.avatar} 
                    alt={review.name} 
                    width={80} 
                    height={80} 
                    className="rounded-full border-4 border-white shadow-lg" 
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {review.name}
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'bg-green-600 scale-125' 
                    : 'bg-gray-400 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
