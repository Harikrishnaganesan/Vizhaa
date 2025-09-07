"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DBE60] focus:border-transparent transition-colors"
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DBE60] focus:border-transparent transition-colors"
            placeholder="your.email@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DBE60] focus:border-transparent transition-colors resize-none"
            placeholder="Tell us about your event or ask us a question..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#2DBE60] text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-200 font-medium transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}