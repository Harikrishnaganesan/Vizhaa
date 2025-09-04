"use client";
import React from "react";
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full py-8 px-8 mt-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm mb-8">
          {/* Left: About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Vizhaa</h3>
            <p className="text-gray-400 max-w-xs leading-relaxed">
              Connecting event organizers with verified local suppliers to make every occasion seamless and memorable.
            </p>
          </div>

          {/* Right: Links Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Event Organizers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Supplier</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Important Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms and Condition</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Logo, Social Icons, Copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <Image src="/footer-logo.svg" alt="Vizhaa Logo" width={28} height={28} className="w-27 h-12" />
          </div>
          
          <div className="flex gap-6 text-white mb-4">
            <a href="#" aria-label="Facebook" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:bg-green-400 transition-colors">
              <FaFacebookF size={14} />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:bg-green-400 transition-colors">
              <FaLinkedinIn size={14} />
            </a>
            <a href="#" aria-label="Instagram" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:bg-green-400 transition-colors">
              <FaInstagram size={14} />
            </a>
            <a href="#" aria-label="YouTube" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:bg-green-400 transition-colors">
              <FaYoutube size={14} />
            </a>
          </div>
          
          <p className="text-gray-500 text-xs">Copyright © 2025 <span className="font-medium">Vizhaa</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
