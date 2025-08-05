"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Righteous } from 'next/font/google';

const righteous = Righteous({
  subsets: ['latin'],
  weight: '400',
});

const slides = [
  
  {
    image: "/caroseul-1.svg",
    heading: "Great events start with great planning!",
    subheading: "We make your event a culinary masterpiece",
    button: "Book Now",
  },
  {
    image: "/caroseul-2.svg",
    heading: "Be the reason someone’s special day is perfect",
    subheading: "Your talent, their celebration we make the connection.",
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
      // Calculate the exact position to scroll to
      const sectionPosition = nextSection.getBoundingClientRect().top + window.pageYOffset;
      
      // Scroll to the exact top of the next section
      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden -top-2 m-0 [p-0">
      <Image
        src={slides[current].image}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
        style={{ opacity: 1 }}
        draggable={false}
        fill
        priority
      />

      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          {slides[current].heading}
        </h1>
        <p className="text-white text-lg md:text-2xl mb-8 drop-shadow-md">
          {slides[current].subheading}
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded shadow-lg text-lg transition mb-12">
          {slides[current].button}
        </button>
        <button
          onClick={handleScroll}
          className="cursor-pointer animate-bounce text-white flex items-center absolute left-1/2 -translate-x-1/2 bottom-[-120px] z-30"
          style={{ zIndex: 30 }}
        >
          <p className={`${righteous.className} text-white text-xl md:text-2xl`}>
            Scroll Down
          </p>
          <Image
            src="/scroll-down.svg"
            alt="Scroll Down Icon"
            width={24}
            height={24}
            className="w-6 h-6 mt-1"
            draggable={false}
          />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;