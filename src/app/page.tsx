'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownDate = new Date('2025-08-04T16:00:00').getTime(); // August 4, 4:00 PM

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-yellow-400 flex items-center justify-center px-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 text-center text-white animate-fade-in">
        <h1 className="text-5xl font-extrabold mb-3 tracking-wide drop-shadow-lg">🎉 Vizhaa</h1>
        <p className="text-xl font-medium mb-6">App Launch On <strong>August 4, 4:00 PM</strong></p>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => (
            <div
              key={label}
              className="bg-white/30 rounded-xl p-4 shadow-md backdrop-blur-md transform hover:scale-105 transition duration-300"
            >
              <div className="text-3xl font-bold">
                {i === 0
                  ? timeLeft.days
                  : i === 1
                  ? timeLeft.hours
                  : i === 2
                  ? timeLeft.minutes
                  : timeLeft.seconds}
              </div>
              <div className="text-sm">{label}</div>
            </div>
          ))}
        </div>
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-md text-black w-64 max-w-full mb-4"
        />
        <br />
        <button className="bg-white text-purple-700 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition-all">
          Notify Me
        </button>
      </div>
    </div>
  );
}
