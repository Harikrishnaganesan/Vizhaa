"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Slide data array
const slides = [
  {
    image: "/hero2.png",
    heading: "Be the reason someone’s special day is perfect",
    subheading: "Your talent, their celebration we make the connection.",
    button: "Book Now",
    
  },
  {
    image: "/hero1.png",
    heading: "Great events start with great planning!",
    subheading: "We make your event a culinary masterpiece",
    button: "Book Now",
    
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    const nextSection = document.getElementById("second-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src={slides[current].image}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
        style={{ opacity: 1 }}
        draggable={false}
        fill
        priority
      />
      

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-60 z-10" /> */}

      

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-4 ">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          {slides[current].heading}
        </h1>
        <p className="text-white text-lg md:text-2xl mb-8 drop-shadow-md">
          {slides[current].subheading}
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded shadow-lg text-lg transition mb-12">
          {slides[current].button}
        </button>
        {/* Scroll Down Button - moved further down */}
        <button
          onClick={handleScroll}
          className="animate-bounce text-white text-lg font-semibold flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-80"
          style={{ zIndex: 30 }}
        >
          Scroll Down <span className="text-2xl">⌄</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
