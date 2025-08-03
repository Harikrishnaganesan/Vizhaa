import React from 'react'
import HeroWork from '../components/work/heroWork';
import SecondWork from '../components/work/secondWork';
import SupplierHowItWorks from '../components/work/SupplierHowItWorks';
import WhyChooseUs from '../components/work/WhyChoose';

export default function Workpage() {
  return (
    <div className="scroll-smooth">
      <HeroWork />
      <SecondWork />
      <SupplierHowItWorks />
      <WhyChooseUs />
      
    </div>
  );
}