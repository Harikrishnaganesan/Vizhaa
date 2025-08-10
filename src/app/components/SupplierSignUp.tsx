"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SupplierSignUp: React.FC<{ onBack?: () => void }> = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    dob: "",
    gender: "",
    aadhar: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle supplier sign up logic
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#253C51] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden" style={{ maxHeight: '90vh', minHeight: '500px' }}>
        {/* Left Side - Welcome Image */}
        <div className="bg-gradient-to-b from-[#f8fafc] to-[#e6f7ef] flex-1 flex flex-col items-center justify-center p-8 min-w-[260px]">
          <img src="/openingcard-supplier.svg" alt="Supplier" className="w-40 h-40 md:w-48 md:h-48 mb-4" />
          <h2 className="text-xl md:text-2xl font-bold text-[#22364A]">Hi! Supplier</h2>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-4 md:p-6 flex flex-col min-w-[260px]" style={{ maxHeight: '90vh' }}>
          <div className="overflow-y-auto pr-1 md:pr-2" style={{ maxHeight: 'calc(90vh - 48px)' }}>
            <h2 className="text-xl md:text-2xl font-bold text-[#22364A] mb-2">Heartly Welcome</h2>
            <p className="mb-4 md:mb-6 text-gray-600">Please enter Your details below</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                name="name" 
                type="text" 
                placeholder="Full Name" 
                value={form.name} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                required 
              />
              
              <div className="flex gap-2">
                <input 
                  name="email" 
                  type="email" 
                  placeholder="Email" 
                  value={form.email} 
                  onChange={handleChange} 
                  className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                  required 
                />
                <button 
                  type="button" 
                  className="bg-[#2DBE60] text-white px-4 py-3 rounded font-semibold whitespace-nowrap"
                >
                  Send OTP
                </button>
              </div>
              
              <input 
                name="otp" 
                type="text" 
                placeholder="Enter OTP" 
                value={form.otp} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                required 
              />
              
              <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                value={form.password} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                required 
              />
              
              <input 
                name="dob" 
                type="text" 
                placeholder="DD/MM/YYYY" 
                value={form.dob} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                required 
              />
              
              <select 
                name="gender" 
                value={form.gender} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              
              <div>
                <label className="block mb-2 font-medium text-gray-700">Aadhar Card</label>
                <input 
                  name="aadhar" 
                  type="file" 
                  accept="image/*,application/pdf" 
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                  required 
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#22364A] text-white font-bold py-3 rounded-lg mt-4"
              >
                Sign up
              </button>
            </form>
          </div>
          
          <button 
            type="button" 
            className="w-full text-[#22364A] underline mt-4 py-2" 
            onClick={() => router.push("/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierSignUp;