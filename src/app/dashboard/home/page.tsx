"use client";

import HeroSection from "../../components/HomePageComponent/HeroSection";
import SecondSection from "../../components/HomePageComponent/SecondSection";
import LaptopSection from "../../components/HomePageComponent/LaptopSection";
import CountReview from "../../components/HomePageComponent/CountReview";
import ReviewSection from "../../components/HomePageComponent/ReviewSection";
import Download from "../../components/HomePageComponent/Download";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <SecondSection />
      <LaptopSection />
      <CountReview />
      <ReviewSection />
      <Download />
    </div>
  );
}