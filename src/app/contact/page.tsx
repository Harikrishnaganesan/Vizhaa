"use client";

import React from "react";
<<<<<<< HEAD
import Header from "../components/Header/Header";
import Footer from "../components/Footer/footer";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import HeroWork from "../components/ContactPageComponent/page";
=======
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
>>>>>>> 7e92d227ae97a43368f963625d0168584731c60c

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
<<<<<<< HEAD
      <HeroWork />
      <div id="second-section" className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
=======
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600">Get in touch with our team</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
>>>>>>> 7e92d227ae97a43368f963625d0168584731c60c
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}