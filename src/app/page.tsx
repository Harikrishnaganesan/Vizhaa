'use client'
import { useEffect, useState } from 'react';
 
export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
 
  useEffect(() => {
    const now = new Date();
    const launchDate = new Date();
    launchDate.setHours(16, 0, 0, 0); // 4:00 PM today
 
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
<div className="flex items-center justify-center h-screen bg-white px-4">
<div className="text-center">
<h1 className="text-4xl font-bold mb-2">⏳ Launching at 4:00 PM Today</h1>
<p className="text-gray-600 mb-6">We’re preparing something exciting!</p>
<div className="flex justify-center gap-4 text-2xl font-mono mb-6">
<div>{timeLeft.hours}h</div>
<div>{timeLeft.minutes}m</div>
<div>{timeLeft.seconds}s</div>
</div>
<input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 border rounded-md mr-2"
        />
<button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Notify Me
</button>
</div>
</div>
  );
}