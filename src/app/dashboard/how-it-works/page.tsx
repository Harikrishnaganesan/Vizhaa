"use client";

import HeroWork from "../../components/HowItWorkPageComponent/heroWork";
import SecondWork from "../../components/HowItWorkPageComponent/secondWork";
import SupplierHowItWorks from "../../components/HowItWorkPageComponent/SupplierHowItWorks";
import WhyChoose from "../../components/HowItWorkPageComponent/WhyChoose";

export default function HowItWorksPage() {
  return (
    <div>
      <HeroWork />
      <SecondWork />
      <SupplierHowItWorks />
      <WhyChoose />
    </div>
  );
}