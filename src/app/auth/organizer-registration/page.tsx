"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EventOrganizerRegistrationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [countdown, setCountdown] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    city: ""
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  // API call helper using production API service
  const apiCall = async (endpoint: string, data: any) => {
    try {
      const api = (await import('../../../services/api')).default;
      
      switch (endpoint) {
        case 'send-otp':
          return await api.auth.sendOTP(data.phone, data.userType);
        case 'verify-otp':
          return await api.auth.verifyOTP(data.sessionId, data.otp, data.phone);
        case 'organizer/signup':
          return await api.auth.organizerSignup(data);
        default:
          throw new Error(`Unknown endpoint: ${endpoint}`);
      }
    } catch (err) {
      console.error(`API Error (${endpoint}):`, err);
      throw err;
    }
  };

  const handleSendOTP = async () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }
    if (!formData.phone || formData.phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await apiCall('send-otp', {
        phone: formData.phone,
        userType: 'organizer'
      });
      
      setSessionId((result as any).sessionId || (result as any).data?.sessionId || 'temp-session');
      setStep(2);
      setCountdown(60);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await apiCall('verify-otp', {
        sessionId,
        otp: formData.otp,
        phone: formData.phone
      });
      
      setStep(3);
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!formData.companyName.trim()) {
      setError("Company name is required");
      return;
    }
    if (!formData.city.trim()) {
      setError("City is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await apiCall('organizer/signup', {
        phone: formData.phone,
        sessionId,
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        companyName: formData.companyName
      });
      
      if (result.success) {
        // Store auth token if provided - token and user are at root level
        const token = result.token || result.data?.token;
        const user = result.user || result.data?.user;
        if (token && user) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('userType', 'organizer');
          localStorage.setItem('userId', user.id);
          alert('Registration successful!');
          router.push('/event-organizers');
        } else {
          alert('Registration successful! Please login.');
          router.push('/auth/user-login');
        }
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#253C51] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <Image src="/openingcard-logo.svg" alt="Vizhaa Logo" width={120} height={60} className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Event Organizer Registration</h1>
            <p className="text-gray-600 mt-2">Step {step} of 3</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 outline-none"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 outline-none"
                required
              />
              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full bg-[#253C51] text-white py-3 rounded-lg hover:bg-[#2A4F71] disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-gray-600 text-center">Enter OTP sent to {formData.phone}</p>
              <input
                type="text"
                name="otp"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={handleInputChange}
                maxLength={6}
                className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 outline-none text-center"
              />
              <button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full bg-[#253C51] text-white py-3 rounded-lg hover:bg-[#2A4F71] disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              {countdown > 0 ? (
                <p className="text-center text-gray-500">Resend OTP in {countdown}s</p>
              ) : (
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full text-blue-600 hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="companyName"
                placeholder="Company/Organization Name"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 outline-none"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 outline-none"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 outline-none"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#253C51] text-white py-3 rounded-lg hover:bg-[#2A4F71] disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Complete Registration"}
              </button>
            </form>
          )}

          <div className="text-center mt-6 space-y-2">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => router.push('/auth/user-login')}
                className="text-blue-600 hover:underline"
              >
                Sign In
              </button>
            </p>
            <button 
              onClick={() => router.push('/auth/role-selection')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Back to Role Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
