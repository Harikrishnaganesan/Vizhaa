"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const OrganizerSignUp: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
  });
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // 1: Details, 2: OTP, 3: Complete

  const [countdown, setCountdown] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Countdown timer for OTP resend
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOTP = async () => {
    if (!form.phone) {
      setMessage("Phone number is required");
      return;
    }

    if (form.phone.length !== 10) {
      setMessage("Please enter a valid 10-digit phone number");
      return;
    }

    if (!form.email) {
      setMessage("Email is required");
      return;
    }

    setLoading(true);
    setMessage("");
    
    try {
      const { authAPI } = await import('../../../services/api.js');
      const result = await authAPI.sendOTP(form.phone, 'organizer');
      setSessionId(result.sessionId);
      setStep(2);
      setCountdown(60);
      setMessage("OTP sent successfully to your phone!");
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!form.otp || form.otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setMessage("");
    
    try {
      const { authAPI } = await import('../../../services/api.js');
      await authAPI.verifyOTP(sessionId, form.otp, form.phone);
      setStep(3);
      setMessage("Phone verified successfully! Please complete your registration.");
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setLoading(true);
    setMessage("");
    
    try {
      const { authAPI } = await import('../../../services/api.js');
      const result = await authAPI.sendOTP(form.phone, 'organizer');
      setSessionId(result.sessionId);
      setCountdown(60);
      setMessage("OTP resent successfully!");
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step !== 3) {
      setMessage("Please complete OTP verification first");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setMessage("");

    const userData = {
      fullName: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
      gender: form.gender,
      dob: form.dob,
      sessionId: sessionId
    };

    try {
      const { authAPI } = await import('../../../services/api.js');
      await authAPI.organizerSignup(userData);
      setMessage("Registration successful! Redirecting to login...");
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#253C51] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden" style={{ maxHeight: '90vh', minHeight: '500px' }}>
        {/* Left Side - Welcome Image */}
        <div className="bg-gradient-to-b from-[#f8fafc] to-[#e6f7ef] flex-1 flex flex-col items-center justify-center p-8 min-w-[260px]">
          <img src="/openingcard-eo.svg" alt="Event Organizer" className="w-40 h-40 md:w-48 md:h-48 mb-4" />
          <h2 className="text-xl md:text-2xl font-bold text-[#22364A]">Hi! Event Organizer</h2>
        </div>
        
        {/* Right Side - Form */}
        <div className="flex-1 p-4 md:p-6 flex flex-col min-w-[260px]" style={{ maxHeight: '90vh' }}>
          <div className="overflow-y-auto pr-1 md:pr-2" style={{ maxHeight: 'calc(90vh - 48px)' }}>
            <h2 className="text-xl md:text-2xl font-bold text-[#22364A] mb-2">Hearty Welcome</h2>
            <p className="mb-4 md:mb-6 text-gray-600">Please enter Your details below</p>
            
            {message && (
              <div className={`mb-4 p-3 rounded ${
                message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Basic Details */}
              {step === 1 && (
                <>
                  <input 
                    name="name" 
                    type="text" 
                    placeholder="Full Name" 
                    value={form.name} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    required 
                  />
                  
                  <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    value={form.email} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    required 
                  />
                  
                  <div className="flex gap-2">
                    <input 
                      name="phone" 
                      type="tel" 
                      placeholder="Phone Number" 
                      value={form.phone} 
                      onChange={handleChange} 
                      className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                      required 
                      pattern="[0-9]{10}" 
                      maxLength={10}
                    />
                    <button 
                      type="button" 
                      onClick={handleSendOTP} 
                      disabled={loading || !form.phone || !form.email}
                      className="bg-[#2DBE60] text-white px-4 py-3 rounded font-semibold whitespace-nowrap disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Send OTP'}
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: OTP Verification */}
              {step === 2 && (
                <>
                  <div className="bg-blue-50 p-3 rounded-md mb-4">
                    <p className="text-sm text-blue-800">
                      OTP sent to {form.phone}. Please check your messages.
                    </p>
                  </div>
                  
                  <input 
                    name="otp" 
                    type="text" 
                    placeholder="Enter 6-digit OTP" 
                    value={form.otp} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    required 
                    maxLength={6}
                    pattern="[0-9]{6}"
                  />
                  
                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={handleVerifyOTP} 
                      disabled={loading || form.otp.length !== 6}
                      className="flex-1 bg-[#2DBE60] text-white px-4 py-3 rounded font-semibold disabled:opacity-50"
                    >
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={handleResendOTP} 
                      disabled={loading || countdown > 0}
                      className="bg-gray-500 text-white px-4 py-3 rounded font-semibold whitespace-nowrap disabled:opacity-50"
                    >
                      {countdown > 0 ? `Resend (${countdown}s)` : 'Resend OTP'}
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Password and Additional Details */}
              {step === 3 && (
                <>
                  <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    value={form.password} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    required 
                    minLength={6}
                  />
                  
                  <input 
                    name="confirmPassword" 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={form.confirmPassword} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    required 
                  />
                  
                  <input 
                    name="dob" 
                    type="date" 
                    placeholder="Date of Birth" 
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
                  
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#22364A] text-white font-bold py-3 rounded-lg mt-4 disabled:opacity-50"
                  >
                    {loading ? 'Registering...' : 'Sign up'}
                  </button>
                </>
              )}
            </form>
          </div>
          
          <button 
            type="button" 
            className="w-full text-[#22364A] underline mt-4 py-2" 
            onClick={onBack}
            disabled={loading}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizerSignUp;