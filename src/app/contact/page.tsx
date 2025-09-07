"use client";

import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/footer";
import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import ContactStats from "../components/contact/ContactStats";
import ContactFAQ from "../components/contact/ContactFAQ";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ContactHero />
      <ContactStats />
      <section id="contact-content" className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Let's Connect</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ready to start planning your next event? Reach out to us and let's make it happen together.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
      <ContactFAQ />
      <Footer />
    </div>
  );
}