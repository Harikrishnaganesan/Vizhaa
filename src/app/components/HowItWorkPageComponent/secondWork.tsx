'use client';
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const steps = [
  {
    title: "Post Your Event",
    desc: "Tell us when, where, and what you need – from caterers to photographers."
  },
  {
    title: "Review Applications",
    desc: "See matching suppliers. Compare profiles, ratings, and past work."
  },
  {
    title: "Select & Confirm",
    desc: "Choose who you trust. Chat directly, finalize quickly."
  },
  {
    title: "Manage with Ease",
    desc: "Edit event details, track responses, and stay in sync with your team."
  }
];

const Event: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          steps.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps(prev => [...prev, index]);
            }, index * 200);
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
      id="second-section"
      ref={sectionRef}
      className={`bg-white rounded-[10px] shadow-md px-4 py-10 md:px-14 max-w-5xl mx-auto flex flex-col md:flex-row md:items-stretch mt-[60px] border border-gray-200 relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div
        className="hidden md:block absolute left-0 top-0 h-full w-[10px] rounded-l-[10px] z-20"
        style={{
          background: "linear-gradient(180deg, #48bb78 0%, #38b2ac 100%)",
          boxShadow: "-8px 0 32px -8px #38b2ac55",
        }}
      />
      <div className="md:w-2/3 md:pl-10">
        <h2 className="text-green-600 text-2xl md:text-3xl font-bold mb-7">
          For Event Organizers
        </h2>
        <ul className="space-y-7">
          {steps.map((step, index) => (
            <li 
              key={step.title} 
              className={`flex items-start gap-3 transition-all duration-500 ${
                visibleSteps.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              <span className="mt-1">
                <span className="inline-block w-4 h-4 rounded-full bg-green-500" />
              </span>
              <div>
                <span className="block font-semibold text-green-600">
                  {step.title}
                </span>
                <span className="block text-gray-700 text-base mt-1">
                  {step.desc}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden md:block w-px mx-8 bg-gray-200" />
      <div className="md:w-1/3 flex flex-col items-center justify-center mt-8 md:mt-0">
        <div className="mb-3 text-center">
          <span className="font-bold text-gray-700 text-base md:text-lg">
            &quot;Your Event, Your Control&quot;
          </span>
          <div className="text-gray-500 text-sm">
            Plan the perfect event in just a few taps
          </div>
        </div>
        <div className="relative w-[180px] h-[130px]">
          <div className="absolute left-0 top-0 h-full w-full rounded-md shadow-[-16px_0_32px_-6px_rgba(56,178,172,0.24)] pointer-events-none" aria-hidden />
          <Image
            src="/EO.svg"
            alt="Event planning"
            width={180}
            height={130}
            className="mx-auto rounded-md relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default Event;
