"use client";

import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/footer";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import HeroWork from "../components/ContactPageComponent/page";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroWork />
      <div id="second-section" className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}