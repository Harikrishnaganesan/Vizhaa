'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    const launchDate = new Date('2025-08-04T16:00:00');

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(timer);
        setLaunched(true);
        setTimeLeft(null);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4 py-10 flex flex-col items-center justify-start">
      {/* 🟣 HEADLINE SECTION */}
      <div className="text-center animate-fade-in-up">
        <h1 className="text-6xl md:text-7xl font-extrabold text-purple-700 drop-shadow mb-4 tracking-wide">
          Vizhaa
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-700 font-medium mb-6">
          App Launch On <span className="text-indigo-600 font-semibold">August 4</span>
        </h2>

        {/* ⏳ COUNTDOWN */}
        {!launched && timeLeft ? (
          <div className="flex justify-center gap-6 text-2xl md:text-3xl font-mono font-bold mb-10 animate-pulse">
            <TimeBox value={timeLeft.days} label="Days" color="bg-purple-200 text-purple-800" />
            <TimeBox value={timeLeft.hours} label="Hours" color="bg-pink-200 text-pink-800" />
            <TimeBox value={timeLeft.minutes} label="Minutes" color="bg-yellow-200 text-yellow-800" />
            <TimeBox value={timeLeft.seconds} label="Seconds" color="bg-green-200 text-green-800" />
          </div>
        ) : (
          <div className="text-2xl font-semibold text-green-700 animate-bounce mb-8">
            🚀 The App is Live!
          </div>
        )}

        
      </div>

      
    </div>
  );
}

// 📦 Countdown Time Box
function TimeBox({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className={`flex flex-col items-center rounded-lg px-4 py-2 shadow-md ${color}`}>
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

// 🧩 Reusable Card
function Card({ title, emoji, color }: { title: string; emoji: string; color: string }) {
  return (
    <div
      className={`rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer ${color} animate-slide-in`}
    >
      <div className="text-4xl mb-2">{emoji}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}
