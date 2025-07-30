'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const launchDate = new Date('2025-08-04T16:00:00');

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-white px-4">
      <div className="text-center animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-2">⏳ Launching on August 4th at 4:00 PM</h1>
        <p className="text-gray-600 mb-6">We’re preparing something exciting!</p>
        <div className="flex justify-center gap-4 text-2xl font-mono mb-6 animate-pulse">
          <div className="bg-gray-100 px-4 py-2 rounded-md shadow">{timeLeft.days}d</div>
          <div className="bg-gray-100 px-4 py-2 rounded-md shadow">{timeLeft.hours}h</div>
          <div className="bg-gray-100 px-4 py-2 rounded-md shadow">{timeLeft.minutes}m</div>
          <div className="bg-gray-100 px-4 py-2 rounded-md shadow">{timeLeft.seconds}s</div>
        </div>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          <button className="px-4 py-2 bg-black text-white rounded-md transition transform hover:scale-105 hover:bg-gray-800 duration-300">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}
