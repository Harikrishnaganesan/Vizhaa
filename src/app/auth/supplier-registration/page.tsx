"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

type Step = 'phone' | 'otp' | 'details';

export default function ServiceSupplierRegistrationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionId, setSessionId] = useState('');
  
  const [phoneData, setPhoneData] = useState({ phone: '' });
  const [otpData, setOtpData] = useState({ otp: '' });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    services: [] as string[],
    aadharCard: null as File | null
  });

  const serviceTypes = ['catering', 'decoration', 'photography', 'music', 'venue', 'transportation', 'flowers', 'security'];

  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const api = (await import('../../../services/api')).default;
      const result = await api.auth.sendOTP(phoneData.phone, 'supplier');
      
      if (result.success) {
        setSessionId((result as any).sessionId || (result as any).data?.sessionId || 'temp-session');
        setCurrentStep('otp');
      } else {
        setError(result.message || 'Failed to send OTP');
      }
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const api = (await import('../../../services/api')).default;
      const result = await api.auth.verifyOTP(sessionId, otpData.otp, phoneData.phone);
      
      if (result.success && ((result as any).phoneVerified || (result as any).data?.phoneVerified)) {
        setCurrentStep('details');
      } else {
        setError(result.message || 'Invalid OTP');
      }
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const completeSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const api = (await import('../../../services/api')).default;
      const result = await api.auth.supplierSignup({
        phone: phoneData.phone,
        sessionId,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        services: formData.services
      });
      
      if (result.success) {
        alert('Registration successful! Please login.');
        router.push('/auth/user-login');
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const renderPhoneStep = () => (
    <form onSubmit={sendOTP} className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Enter Your Phone Number</h2>
        <p className="text-gray-600 text-sm mt-2">We'll send you a verification code</p>
      </div>
      
      <div>
        <input
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={phoneData.phone}
          onChange={(e) => setPhoneData({ phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-lg"
          pattern="[0-9]{10}"
          maxLength={10}
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading || phoneData.phone.length !== 10}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending OTP...' : 'Send OTP'}
      </button>
    </form>
  );

  const renderOTPStep = () => (
    <form onSubmit={verifyOTP} className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Verify OTP</h2>
        <p className="text-gray-600 text-sm mt-2">Enter the 6-digit code sent to {phoneData.phone}</p>
      </div>
      
      <div>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otpData.otp}
          onChange={(e) => setOtpData({ otp: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-center text-lg tracking-widest"
          maxLength={6}
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading || otpData.otp.length !== 6}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
      
      <button
        type="button"
        onClick={() => setCurrentStep('phone')}
        className="w-full text-gray-600 hover:text-gray-800 text-sm"
      >
        ← Change Phone Number
      </button>
    </form>
  );

  const renderDetailsStep = () => (
    <form onSubmit={completeSignup} className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Complete Your Profile</h2>
        <p className="text-gray-600 text-sm mt-1">Fill in your details to get started</p>
      </div>
      
      <input
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
      
      <input
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
      
      <input
        type="password"
        placeholder="Create Password"
        value={formData.password}
        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        minLength={6}
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Services You Offer</label>
        <div className="grid grid-cols-2 gap-2">
          {serviceTypes.map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => handleServiceToggle(service)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                formData.services.includes(service)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {service.charAt(0).toUpperCase() + service.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Card (Optional)</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setFormData(prev => ({ ...prev, aadharCard: e.target.files?.[0] || null }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      
      <button
        type="submit"
        disabled={loading || formData.services.length === 0}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Image src="/openingcard-logo.svg" alt="Vizhaa Logo" width={120} height={60} className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Supplier Registration</h1>
            
            {/* Progress Steps */}
            <div className="flex justify-center mt-6 space-x-2">
              {['phone', 'otp', 'details'].map((step, index) => (
                <div key={step} className={`w-3 h-3 rounded-full ${
                  currentStep === step ? 'bg-blue-600' :
                  ['phone', 'otp', 'details'].indexOf(currentStep) > index ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              ))}
            </div>
          </div>

          {currentStep === 'phone' && renderPhoneStep()}
          {currentStep === 'otp' && renderOTPStep()}
          {currentStep === 'details' && renderDetailsStep()}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
              {error}
            </div>
          )}
        </div>

        <div className="text-center mt-6 space-y-2">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => router.push('/auth/user-login')}
              className="text-blue-600 font-medium hover:underline"
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
  );
}