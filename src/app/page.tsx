// src/app/page.tsx

"use client";
import React from "react";
import SecondSection from "./components/SecondSection";
import HeroSection from "./components/HeroSection";
import LaptopSection from "./components/LaptopSection";
import ReviewSection from "./components/ReviewSection";
import CountReview from "./components/CountReview";
import Download from "./components/Download";


export default function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />
      <SecondSection />
      <LaptopSection />
      <ReviewSection />
      <CountReview />
      <Download />
\
    </main>
  );
}
