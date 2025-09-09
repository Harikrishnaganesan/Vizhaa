'use client';
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const steps = [
  {
    title: 'Register & Set Up Profile',
    desc: 'Showcase your skills, services, and service areas.',
  },
  {
    title: 'Browse Events',
    desc: 'Explore events near you based on your niche.',
  },
  {
    title: 'Apply to Gigs',
    desc: 'One-click applications with optional quotes or notes.',
  },
  {
    title: 'Get Hired & Deliver',
    desc: 'Get confirmed, do great work, and earn glowing reviews.',
  },
];

const SupplierHowItWorks: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          // Animate steps one by one
          steps.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps(prev => [...prev, index]);
            }, index * 300);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative bg-white border border-gray-200 rounded-[10px] shadow-md px-4 py-10 md:px-14 max-w-5xl mx-auto flex flex-col md:flex-row md:items-stretch mt-45 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Right colored border with shadow */}
      <div
        className="hidden md:block absolute right-0 top-0 h-full w-[12px] rounded-r-[10px] z-20"
        style={{
          background: "linear-gradient(180deg, #16BC5B 0%, #63E6BE 100%)", // Use your preferred green gradient
          boxShadow: "16px 0 36px -8px #16BC5B88", // green shadow, adjust color/opacity for effect
        }}
        aria-hidden
      />
      {/* Left - Illustration & Quote */}
      <div className="md:w-1/3 flex flex-col items-center justify-center mb-6 md:mb-0 md:mr-8 z-10">
        {/* Quote */}
        <div className="mb-4 text-center">
          <span className="font-bold text-gray-700">
            &quot;Your Skills. Real Gigs. Real Growth.&quot;
          </span>
          <div className="text-gray-500 text-sm">
            Turn your talent into trusted work opportunities
          </div>
        </div>
        {/* Illustration */}
        <Image
          src="/Supplier.svg" // Replace with your path
          alt="Supplier working illustration"
          width={160}
          height={160}
          className="mx-auto"
        />
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px mx-8 bg-gray-200 z-10" />

      {/* Right - How It Works */}
      <div className="md:w-2/3 flex flex-col justify-center z-10">
        <h2 className="text-green-600 text-2xl md:text-3xl font-bold mb-7">For Supplier</h2>
        <ul className="space-y-7">
          {steps.map((step, idx) => (
            <li 
              key={step.title} 
              className={`flex items-start gap-3 transition-all duration-500 ${
                visibleSteps.includes(idx) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
            >
              <span className="mt-1">
                <span className={`inline-block w-4 h-4 rounded-full bg-green-500`} />
              </span>
              <div>
                <span className="block font-semibold text-green-600">
                  <span className={idx === 0 ? "text-[#16BC5B]" : "text-green-700"}>
                    {step.title}
                  </span>
                </span>
                <span className="block text-gray-700 text-base mt-1">
                  {step.desc}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SupplierHowItWorks;
