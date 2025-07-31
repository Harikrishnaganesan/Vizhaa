"use client";
import React from "react";
import Image from "next/image";

// You can use FontAwesome for emoji, or Lottie for animation if you have the JSON
// For hand shake, we'll use CSS animation for up-down effect

const Laptop = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center py-12">
      <div className="relative flex flex-col items-center justify-center">
        {/* Laptop illustration */}
        <div className="relative z-10">
          <Image
            src="/laptop.png"
            alt="Laptop"
            width={500}
            height={300}
            className="mx-auto"
            priority
          />
          {/* Screen content overlay */}
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[340px] h-[180px] flex flex-col items-center justify-center text-center bg-transparent">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">
              What will you discover<br />inside the app?
            </h2>
            
            <p className="text-gray-700 text-base md:text-lg">
              From booking top-rated event workers<br />
              to managing tasks everything you need<br />
              right at your fingertips
            </p>
          </div>
        </div>
        {/* Hands holding phones, animated shake, overlapping the laptop */}
        <div className="absolute -left-32 top-60 -translate-y-1/2 z-2   flex flex-col items-center">
          <div className="relative origin-bottom animate-swing-left">
            <Image
              src="/left-hand.png"
              alt="Left Hand"
              width={210}
              height={200}
              className=""
              priority
            />
          </div>
        </div>
        <div className="absolute -right-32 top-60 -translate-y-1/2 z-2 flex flex-col items-center">
          <div className="relative origin-bottom animate-swing-right">
            <Image
              src="/right-hand.png"
              alt="Right Hand"
              width={210}
              height={200}
              className=""
              priority
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes swing-left {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(-28deg); }
        }
        @keyframes swing-right {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(25deg); }
        }
        .animate-swing-left {
          animation: swing-left 3s infinite;
          transform-origin: bottom center;
        }
        .animate-swing-right {
          animation: swing-right 3s infinite;
          transform-origin: bottom center;
        }
      `}</style>
    </section>
  );
};

export default Laptop;
