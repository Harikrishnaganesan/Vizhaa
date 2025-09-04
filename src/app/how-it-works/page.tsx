"use client";

import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import HeroWork from "../components/HowItWorkPageComponent/heroWork";
import SecondWork from "../components/HowItWorkPageComponent/secondWork";
import SupplierHowItWorks from "../components/HowItWorkPageComponent/SupplierHowItWorks";
import WhyChoose from "../components/HowItWorkPageComponent/WhyChoose";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroWork />
      <SecondWork />
      <SupplierHowItWorks />
      <WhyChoose />
      <Footer />
    </div>
  );
}