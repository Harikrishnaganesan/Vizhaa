"use client";

import React from "react";

export default function ContactStats() {
  const stats = [
    { number: "500+", label: "Events Organized", icon: "🎉" },
    { number: "50+", label: "Cities Covered", icon: "🏙️" },
    { number: "1000+", label: "Happy Clients", icon: "😊" },
    { number: "24/7", label: "Support Available", icon: "🕒" }
  ];

  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Why Choose Vizhaa?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to making your event planning experience seamless and successful
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl lg:text-3xl font-bold text-[#23364E] mb-2">{stat.number}</div>
              <div className="text-sm lg:text-base text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}