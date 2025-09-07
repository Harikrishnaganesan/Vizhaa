"use client";

import React, { useState } from "react";

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I get started with Vizhaa?",
      answer: "Simply sign up for an account, choose your role (Event Organizer or Supplier), and start exploring our platform. Our onboarding process will guide you through the setup."
    },
    {
      question: "What types of events can I organize?",
      answer: "Vizhaa supports all types of events including weddings, corporate events, birthday parties, conferences, and more. Our platform is flexible to accommodate any event size or type."
    },
    {
      question: "How do I find suppliers for my event?",
      answer: "Use our advanced search and filtering system to find verified suppliers in your area. You can browse by category, location, budget, and ratings to find the perfect match."
    },
    {
      question: "Is there customer support available?",
      answer: "Yes! We offer 24/7 customer support through multiple channels including chat, email, and phone. Our team is always ready to help you with any questions or issues."
    },
    {
      question: "What are the pricing plans?",
      answer: "We offer flexible pricing plans for both event organizers and suppliers. Contact our sales team for detailed pricing information tailored to your specific needs."
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about our platform
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}