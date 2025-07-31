"use client";
import React from "react";
import Image from "next/image";

const stats = [
  {
    icon: "/section1.png", // Place your image in public/stat-suppliers.png
    value: "5,000+",
    label: "Verified Suppliers"
  },
  {
    icon: "/section2.png", // Place your image in public/stat-cities.png
    value: "500+",
    label: "Cities Covered"
  },
  {
    icon: "/section-3.png", // Place your image in public/stat-events.png
    value: "10,000+",
    label: "Events Posted"
  }
];

const CountReview = () => {
  return (
    <section className="w-full flex items-center justify-center py-16 bg-white" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
      <div className="flex flex-col md:flex-row gap-12 md:gap-32 items-center justify-center w-full max-w-6xl mx-auto">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center min-w-[200px]">
            <Image src={stat.icon} alt={stat.label} width={80} height={80} className="mb-4" />
            <div className="text-4xl md:text-5xl font-extrabold text-[#223344] mb-1">{stat.value}</div>
            <div className="text-[#223344] text-xl text-center font-semibold tracking-tight">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountReview;
