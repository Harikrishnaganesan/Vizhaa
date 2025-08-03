// src/app/page.tsx

"use client";
import React from "react";
import FullPageScroll from "./components/FullPageScroll";
import SecondSection from "./components/SecondSection";
import HeroSection from "./components/HeroSection";
import LaptopSection from "./components/LaptopSection";
import ReviewSection from "./components/ReviewSection";
import CountReview from "./components/CountReview";
import Download from "./components/Download";
import Footer from "./components/footer";

export default function HomePage() {
  return (
    <FullPageScroll>
      <HeroSection />
      <SecondSection />
      <LaptopSection />
      <ReviewSection />
      <CountReview />
      <Download />
      <Footer />
    </FullPageScroll>
  );
}
