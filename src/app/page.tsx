'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const now = new Date();
    const launchDate = new Date('2025-08-04T16:00:00'); // Set to 4:00 PM on August 4, 2025

    // If it's already past 4:00 PM, keep it at 0
    if (now.getTime() > launchDate.getTime()) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days: 0, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 px-6">
      <div className="text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-xl backdrop-blur-xl">
        <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-wide">⏳ Launching on August 4th at 4:00 PM</h1>
        <p className="text-lg text-gray-700 mb-6">We're preparing something exciting!</p>

        <div className="flex justify-center gap-6 text-4xl font-mono text-gray-900 mb-8">
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg w-20">
            <div className="font-bold">{timeLeft.hours}</div>
            <div className="text-sm text-gray-500">h</div>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg w-20">
            <div className="font-bold">{timeLeft.minutes}</div>
            <div className="text-sm text-gray-500">m</div>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg w-20">
            <div className="font-bold">{timeLeft.seconds}</div>
            <div className="text-sm text-gray-500">s</div>
          </div>
        </div>
        
        {/* Optional future input section */}
        {/* <input 
          type="email" 
          placeholder="Enter your email" 
          className="px-6 py-3 border-2 border-gray-300 rounded-md mb-6 w-full max-w-xs text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
          Notify Me
        </button> */}
      </div>
    </div>
  );
}
