"use client";
import React from "react";
import Image from "next/image";

const SecondSection = () => {
  return (
    <section id="second-section" className="w-full min-h-[500px] flex flex-col md:flex-row items-center justify-between px-8 py-20 bg-white">
      {/* Left: Heading, subheading, icons */}
      <div className="flex-1 flex flex-col items-start justify-center max-w-2xl">
        <div className="flex items-center mb-2">
          <h2 className="text-4xl md:text-5xl font-bold text-green-600 mr-4 leading-tight">
            Better events for
            <br className="hidden md:block" />
            more people.
          </h2>
        </div>
        <p className="text-base md:text-lg text-gray-500 mb-4 mt-2">
          For every celebration, we connect the right people<br className="hidden md:block" />
          so organizers can focus on what truly matters.
        </p>
      </div>
      {/* Right: Large illustration (static image) */}
      <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
        <Image
          src="/secondlottie.png"
          alt="Event Catering Illustration"
          width={400}
          height={300}
          className="w-72 h-72 md:w-[400px] md:h-[300px] object-contain"
          draggable={false}
        />
      </div>
    </section>
  );
};

export default SecondSection;
