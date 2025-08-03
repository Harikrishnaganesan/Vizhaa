'use client';
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const WhyChooseUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`relative bg-white border border-gray-200 rounded-[10px] shadow-md px-4 py-10 md:px-14 max-w-5xl mx-auto flex flex-col md:flex-row md:items-stretch mt-25 mb-45 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Left colored border with shadow */}
      <div
        className="hidden md:block absolute left-0 top-0 h-full w-[12px] rounded-l-[10px] z-20"
        style={{
          background: "linear-gradient(180deg, #16BC5B 0%, #63E6BE 100%)", // adjust colors for your brand
          boxShadow: "-16px 0 36px -8px #16BC5B88", // green shadow, tweak opacity as desired
        }}
        aria-hidden
      />
      {/* Left Section */}
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold text-green-600 mb-6">Why Choose Us</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-green-500 mr-3 mt-1">●</span>
            <span>Location-based Matching.</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3 mt-1">●</span>
            <span>Safe In-app Communication</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3 mt-1">●</span>
            <span>Verified Profiles & Transparent Ratings</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3 mt-1">●</span>
            <span>Direct Dealings, No Middlemen</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3 mt-1">●</span>
            <span>Real-Time Notifications & Updates</span>
          </li>
        </ul>
      </div>
      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col items-center justify-center mt-8 md:mt-0">
        <div className="text-center">
          <span className="font-semibold">
            &quot;We&apos;re Built for Your Success&quot;
          </span>
          <p className="text-sm mt-1">
            Smart tools, real connections, zero hassle
          </p>
        </div>
        <div className="mt-4">
          <Image
            src="/bro.png"
            alt="Teamwork Illustration"
            width={260}
            height={260}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
