"use client";

import React from "react";

export default function ContactInfo() {
  return (
    <div className="bg-[#23364E] text-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-[#2DBE60] p-3 rounded-lg">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Address</h3>
            <p className="text-gray-300">Coimbatore, Tamil Nadu, India</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="bg-[#2DBE60] p-3 rounded-lg">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M22 12.36V16a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3.64a2 2 0 0 1 2 1.73 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 12.36z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Phone</h3>
            <p className="text-gray-300">+91 98765 43210</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="bg-[#2DBE60] p-3 rounded-lg">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <p className="text-gray-300">contact@vizhaa.com</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="bg-[#2DBE60] p-3 rounded-lg">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
            <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-300">Sat: 10:00 AM - 4:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}