"use client";

import React from "react";
<<<<<<< HEAD
import Header from "./components/Header/Header";
import Footer from "./components/Footer/footer";
=======
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
>>>>>>> 7e92d227ae97a43368f963625d0168584731c60c
import HeroSection from "./components/HomePageComponent/HeroSection";
import SecondSection from "./components/HomePageComponent/SecondSection";
import LaptopSection from "./components/HomePageComponent/LaptopSection";
import CountReview from "./components/HomePageComponent/CountReview";
import ReviewSection from "./components/HomePageComponent/ReviewSection";
import Download from "./components/HomePageComponent/Download";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <SecondSection />
      <LaptopSection />
      <CountReview />
      <ReviewSection />
      <Download />
      <Footer />
    </div>
  );
}