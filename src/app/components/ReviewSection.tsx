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
          setCurrentStep(1); // Show reviews immediately when section is visible
        } else {
          setIsScrollLocked(false);
          setCurrentStep(0); // Reset when leaving view
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
      className="w-full px-8 py-8 mb-16 flex flex-col items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-green-600 mb-4 text-center">
          Our Client Review
        </h2>
        <p className="text-gray-600 text-center mb-16 text-lg">
          The reasons why people loves us and become our partner.
        </p>
        
        <div className="relative overflow-hidden">
          <div className="flex justify-center items-center gap-6 min-h-[350px]">
            {getVisibleReviews().map((review, idx) => (
              <div
                key={`${currentSlide}-${idx}`}
                className={`bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center transition-all duration-500 relative ${
                  review.isCenter 
                    ? 'w-96 h-80 z-10 shadow-2xl' 
                    : 'w-80 h-72 opacity-80 scale-95'
                }`}
              >
                {/* Avatar positioned at the top of the card */}
                <div className={`${review.isCenter ? 'w-24 h-24' : 'w-20 h-20'} rounded-full overflow-hidden mb-6 shadow-lg border-4 border-gray-100`}>
                  <Image 
                    src={review.avatar} 
                    alt={review.name} 
                    width={review.isCenter ? 96 : 80} 
                    height={review.isCenter ? 96 : 80} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                {/* Content */}
                <div className="w-full text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {review.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                      {review.text}
                    </p>
                  </div>
                </div>

                {/* Green bottom accent bar for center card */}
                {review.isCenter && (
                  <div className="absolute bottom-0 left-0 right-0 h-3 bg-green-400 rounded-b-3xl"></div>
                )}
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
