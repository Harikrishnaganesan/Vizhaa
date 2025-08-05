"use client";
import React from 'react';
import { FaEnvelope, FaPhone, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import HeroWork from '../components/conatct/heroWork';

function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
        <HeroWork/>
      {/* Header Section */}


      {/* Contact Sections */}
      <div id="second-section" className="max-w-7xl mx-auto px-8 mt-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Information */}
          <div className="space-y-12">
            {/* Get in Touch Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-green-600 mb-4">Get in Touch</h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">General Inquiries</h3>
                <p className="text-gray-600 mb-6">
                  Have something to ask or share? Reach out to us for anything — we&apos;re listening!
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaEnvelope className="text-blue-600 text-lg" />
                  </div>
                  <span className="text-gray-800 font-medium">support@vizhaa.com</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaPhone className="text-green-600 text-lg" />
                  </div>
                  <span className="text-gray-800 font-medium">Phone: +91 98765 43210</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <FaClock className="text-gray-600 text-lg" />
                  </div>
                  <span className="text-gray-800 font-medium">Hours: Mon - Sat, 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Technical Help Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-green-600 mb-4">Need Technical Help?</h2>
              <div className="mb-6">
                <p className="text-gray-600 mb-2">Facing issues with the app or dashboard?</p>
                <p className="text-gray-600 mb-6">Our technical support team is here to guide you step-by-step.</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaEnvelope className="text-blue-600 text-lg" />
                </div>
                <span className="text-gray-800 font-medium">Email: techsupport@vizhaa.com</span>
              </div>
            </div>

            {/* Partner With Us Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-green-600 mb-4">Partner With Us</h2>
              <div className="mb-6">
                <p className="text-gray-600 mb-6">
                  Are you a vendor, brand, or event service looking to collaborate?
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaEnvelope className="text-blue-600 text-lg" />
                  </div>
                  <span className="text-gray-800 font-medium">Email: partnerships@vizhaa.com</span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-red-600 text-lg" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-medium block">Office Address:</span>
                    <span className="text-gray-600">Vizhaa Technologies, 123 Event Avenue, Chennai, Tamil Nadu - 600001, India.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-xl">
                <div className="relative">
                  {/* Mobile Phone Illustration */}
                  <div className="mx-auto w-64 h-96 bg-green-400 rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-black rounded-full opacity-20"></div>
                    
                    {/* Screen Content */}
                    <div className="pt-16 px-6 text-white">
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-2xl">💬</span>
                        </div>
                        <h3 className="text-lg font-semibold">Get in Touch</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-white bg-opacity-20 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">📧</span>
                            <span className="text-sm">Email Support</span>
                          </div>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">📞</span>
                            <span className="text-sm">Phone Support</span>
                          </div>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">🤝</span>
                            <span className="text-sm">Partnership</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 rounded-lg shadow-lg transform rotate-12 flex items-center justify-center">
                    <span className="text-white font-bold">@</span>
                  </div>
                  
                  <div className="absolute top-1/4 -right-6 w-16 h-16 bg-blue-400 rounded-2xl shadow-lg transform -rotate-12 flex items-center justify-center">
                    <span className="text-white text-2xl">💼</span>
                  </div>
                  
                  <div className="absolute bottom-1/4 -left-8 w-14 h-14 bg-purple-400 rounded-xl shadow-lg transform rotate-45 flex items-center justify-center">
                    <span className="text-white text-xl">📧</span>
                  </div>
                  
                  {/* Person Illustration */}
                  <div className="absolute bottom-0 right-12 w-24 h-32">
                    <div className="w-8 h-8 bg-yellow-300 rounded-full mx-auto mb-2"></div>
                    <div className="w-12 h-16 bg-green-600 rounded-t-lg mx-auto"></div>
                    <div className="flex space-x-1 justify-center">
                      <div className="w-2 h-8 bg-green-600 rounded"></div>
                      <div className="w-2 h-8 bg-green-600 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-50 py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let&apos;s work together to make your next event unforgettable.
          </p>
          <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;