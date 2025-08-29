
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ---- RESET PASSWORD VIEW ----
function ResetPasswordView({ onToast, onBack }: { onToast: (msg: string) => void; onBack: () => void }) {
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const labelFloat = isFocused || password.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassword('');
    onToast('Password reset successful!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="max-w-4xl bg-white rounded-2xl shadow-xl flex overflow-hidden relative w-full">
        {/* Top left logo */}
        <Image
          src="/lognlogo.png"
          alt="Vizhaa Logo"
          width={110}
          height={110}
          className="absolute left-8 top-5 w-24 z-10"
          priority
        />
        <div className="w-full md:w-1/2 flex flex-col justify-center p-10 pl-20">
          <div className="mt-20 mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h2>
            <p className="text-sm text-gray-500 mb-6">Enter new Password</p>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-8 h-16 flex items-center">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="peer w-full pl-3 pr-3 py-4 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-transparent
                             outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="New Password"
                  autoComplete="off"
                  required
                />
                <label
                  htmlFor="password"
                  className={`
                    absolute bg-white px-1 text-gray-500 transition-all duration-300 pointer-events-none z-20
                    ${labelFloat
                      ? 'top-0 left-3 text-xs text-blue-600 transform translate-y-0'
                      : 'top-1/2 left-3 text-base -translate-y-1/2'}
                  `}
                  style={{ transitionProperty: 'top, left, font-size, transform' }}
                >
                  Enter new Password
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-[#253C51] text-white text-lg font-semibold rounded-md py-2 transition hover:bg-[#2A4F71] shadow"
              >
                Submit
              </button>
            </form>
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={onBack}
                className="text-blue-600 hover:underline text-sm"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
        {/* Right illustration */}
        <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center relative">
          <div className="w-80 relative">
            <Image
              src="/logn.svg"
              alt="Welcome Illustration"
              width={320}
              height={320}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- OTP VIEW ----
function OTPView({ onBack, onVerified }: { onBack: () => void; onVerified: () => void }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isFocused, setIsFocused] = useState<number | null>(null);

  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Ensure refs array has 6 elements
  if (otpRefs.current.length !== 6) {
    otpRefs.current = Array(6).fill(null);
  }

  const handleChange = (val: string, idx: number) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < otp.length - 1) {
      otpRefs.current[idx + 1]?.focus();
    }
  };

  useEffect(() => {
    if (otp.every(d => d.length === 1)) {
      setTimeout(() => onVerified(), 250);
    }
  }, [otp, onVerified]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="max-w-4xl bg-white rounded-2xl shadow-xl flex overflow-hidden relative w-full">
        <Image
          src="/lognlogo.png"
          alt="Vizhaa Logo"
          width={110}
          height={110}
          className="absolute left-8 top-5 w-24 z-10"
          priority
        />
        <div className="w-full md:w-1/2 flex flex-col justify-center p-10 pl-20">
          <div className="mt-20 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Email OTP</h2>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                ref={el => { otpRefs.current[idx] = el; }}
                className={`w-12 h-12 text-2xl text-center border ${
                  isFocused === idx ? 'border-blue-600' : 'border-gray-300'
                } rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition`}
                value={digit}
                onChange={e => handleChange(e.target.value, idx)}
                onFocus={() => setIsFocused(idx)}
                onBlur={() => setIsFocused(null)}
                autoComplete="one-time-code"
              />
            ))}
                
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2">
            <button
              type="button"
              onClick={onBack}
              className="text-blue-600 hover:underline text-sm"
            >
              Back to Login
            </button>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center relative">
          <div className="w-80 relative">
            <Image
              src="/logn.svg"
              alt="Welcome Illustration"
              width={320}
              height={320}
              className="w-full h-auto"
              priority
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- FORGOT PASSWORD VIEW ----
function ForgotPassword({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);

  const labelFloat = isFocused || phone.length > 0;

  const sendResetOTP = async () => {
    setLoading(true);
    setError('');
    try {
      const { authAPI } = await import('../../../services/api.js');
      const result = await authAPI.forgotPassword(phone);
      setSessionId(result.sessionId);
      setStep('otp');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyResetOTP = async () => {
    setLoading(true);
    setError('');
    try {
      const { authAPI } = await import('../../../services/api.js');
      await authAPI.verifyPasswordResetOTP(sessionId, otp, phone);
      setStep('newPassword');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { authAPI } = await import('../../../services/api.js');
      await authAPI.resetPassword(sessionId, phone, newPassword);
      alert('Password reset successful! Please login with your new password.');
      onBack();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="max-w-4xl bg-white rounded-2xl shadow-xl flex overflow-hidden relative w-full">
        <Image
          src="/lognlogo.png"
          alt="Vizhaa Logo"
          width={110}
          height={110}
          className="absolute left-8 top-5 w-24 z-10"
          priority
        />
        <div className="w-full md:w-1/2 flex flex-col justify-center p-10 pl-20">
          <div className="mt-20 mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {step === 'phone' ? 'Forgot Password' : step === 'otp' ? 'Verify OTP' : 'Reset Password'}
            </h2>
            <p className="text-sm text-gray-500">
              {step === 'phone' ? 'Enter mobile number to reset password' : 
               step === 'otp' ? `OTP sent to ${phone}` : 'Enter your new password'}
            </p>
          </div>
          
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          
          {step === 'phone' && (
            <form onSubmit={e => { e.preventDefault(); sendResetOTP(); }}>
              <div className="relative mb-6 h-16 flex items-center">
                <input
                  type="tel"
                  value={phone}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => setPhone(e.target.value)}
                  className="peer w-full pl-3 pr-3 py-4 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-transparent outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Mobile Number"
                  required
                />
                <label className={`absolute bg-white px-1 text-gray-500 transition-all duration-300 pointer-events-none z-20 ${
                  labelFloat ? 'top-0 left-3 text-xs text-blue-600 transform translate-y-0' : 'top-1/2 left-3 text-base -translate-y-1/2'
                }`}>
                  Mobile Number
                </label>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#253C51] text-white text-lg font-semibold rounded-md py-2 mt-2 transition hover:bg-[#2A4F71] shadow disabled:opacity-50">
                {loading ? 'Sending...' : 'Send Reset OTP'}
              </button>
            </form>
          )}
          
          {step === 'otp' && (
            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full pl-3 pr-3 py-4 border border-gray-300 rounded-md mb-4"
                placeholder="Enter 6-digit OTP"
              />
              <button onClick={verifyResetOTP} disabled={loading} className="w-full bg-[#253C51] text-white text-lg font-semibold rounded-md py-2 mb-2 disabled:opacity-50">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button onClick={sendResetOTP} disabled={loading} className="w-full bg-gray-500 text-white text-sm rounded-md py-2">
                Resend OTP
              </button>
            </div>
          )}
          
          {step === 'newPassword' && (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full pl-3 pr-3 py-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter new password"
                  required
                  minLength={6}
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setIsConfirmFocused(true)}
                  onBlur={() => setIsConfirmFocused(false)}
                  className="w-full pl-3 pr-3 py-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              <button onClick={resetPassword} disabled={loading || !newPassword || !confirmPassword} className="w-full bg-[#253C51] text-white text-lg font-semibold rounded-md py-2 disabled:opacity-50 mt-4">
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          )}
          
          <div className="flex justify-center mt-6">
            <button type="button" onClick={onBack} className="text-blue-600 hover:underline text-sm">
              Back to Login
            </button>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center relative">
          <div className="w-80 relative">
            <Image src="/logn.svg" alt="Welcome Illustration" width={320} height={320} className="w-full h-auto" priority />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- LOGIN VIEW with API integration ----
function LoginView({ onForgot }: { onForgot: () => void }) {
  const [phone, setPhone] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const phoneLabelFloat = isPhoneFocused || phone.length > 0;
  const passwordLabelFloat = isPasswordFocused || password.length > 0;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { authAPI } = await import('../../../services/api.js');
      const result = await authAPI.login(phone, password);
      
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userType', result.user.userType);
      localStorage.setItem('userId', result.user.id);
      
      // Redirect based on user type
      if (result.user.userType === 'organizer') {
        router.push('/event-organizers');
      } else {
        router.push('/supplier-dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="max-w-4xl bg-white rounded-2xl shadow-xl flex overflow-hidden relative w-full">
        <Image
          src="/lognlogo.png"
          alt="Vizhaa Logo"
          width={110}
          height={110}
          className="absolute left-8 top-5 w-24 z-10"
          priority
        />
        <div className="w-full sm:w-2/3 flex flex-col justify-center p-10 pl-20">
          <div className="mb-8 mt-10">
            <span className="text-3xl font-bold text-gray-800">Welcome Back</span>
            <p className="text-gray-500 mt-1">Please enter log in details below</p>
          </div>
          <form onSubmit={handleLogin}>
            {/* Phone Input */}
            <div className="mb-6 relative h-16 flex items-center">
              <button
                type="button"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 hover:text-blue-500 focus:outline-none z-10"
                aria-label="Clear phone"
                onClick={() => setPhone('')}
                tabIndex={0}
              >
                <FaEnvelope />
              </button>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => setIsPhoneFocused(false)}
                className={`
                  peer pl-11 pr-3 py-4 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-transparent outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300
                  ${phoneLabelFloat ? 'w-[110%]' : 'w-full'}
                `}
                placeholder="Mobile Number"
                autoComplete="off"
                required
                style={{ transitionProperty: 'width' }}
              />
              <label
                htmlFor="phone"
                className={`
                  absolute bg-white px-1 text-gray-500 transition-all duration-300 pointer-events-none z-20
                  ${phoneLabelFloat
                    ? 'top-0 left-3 text-xs text-blue-600 transform translate-y-0'
                    : 'top-1/2 left-11 text-base -translate-y-1/2'}
                `}
                style={{ transitionProperty: 'top, left, font-size, transform' }}
              >
                Mobile Number
              </label>
            </div>
            {/* Password Input */}
            <div className="mb-6 relative h-16 flex items-center">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 pointer-events-none z-10">
                <FaLock />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                className={`
                  peer pl-11 pr-11 py-4 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-transparent outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300
                  ${passwordLabelFloat ? 'w-[110%]' : 'w-full'}
                `}
                placeholder="Password"
                autoComplete="off"
                required
                style={{ transitionProperty: 'width' }}
              />
              <label
                htmlFor="password"
                className={`
                  absolute bg-white px-1 text-gray-500 transition-all duration-300 pointer-events-none z-20
                  ${passwordLabelFloat
                    ? 'top-0 left-3 text-xs text-blue-600 transform translate-y-0'
                    : 'top-1/2 left-11 text-base -translate-y-1/2'}
                `}
                style={{ transitionProperty: 'top, left, font-size, transform' }}
              >
                Password
              </label>
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 hover:text-blue-500 focus:outline-none z-10"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={0}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && (
              <div className="text-red-500 text-sm mb-3">{error}</div>
            )}
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={onForgot}
                className="text-sm text-black underline hover:text-blue-600 cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-md bg-[#253C51] text-white text-lg font-semibold transition hover:bg-[#2A4F71] shadow disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <div className="text-center mt-6 text-gray-600">
            Don&apos;t Have an Account?{' '}
            <Link href="/" className="text-blue-600 font-medium">
              Sign Up
            </Link>
          </div>
        </div>
        <div className="hidden sm:flex w-1/2 bg-blue-50 items-center justify-center relative">
          <div className="w-80 relative">
            <Image
              src="/logn.svg"
              alt="Welcome Illustration"
              width={320}
              height={320}
              className="w-full h-auto"
              priority
            />
           
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main App with Toast & View Switch ---
export default function Page() {
  const [view, setView] = useState<'login' | 'forgot' | 'otp' | 'reset'>('login');
  const [toast, setToast] = useState<string | null>(null);

  // Show toast and auto-dismiss after 2.5s
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      {/* TOAST MESSAGE */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 bg-green-600 shadow-lg text-white font-semibold rounded transition-all animate-toast-in">
          {toast}
        </div>
      )}
      {/* MAIN UI */}
      {view === 'login' ? (
        <LoginView onForgot={() => setView('forgot')} />
      ) : view === 'forgot' ? (
        <ForgotPassword onBack={() => setView('login')} onNext={() => setView('otp')} />
      ) : view === 'otp' ? (
        <OTPView onBack={() => setView('login')} onVerified={() => setView('reset')} />
      ) : (
        <ResetPasswordView onToast={showToast} onBack={() => setView('login')} />
      )}

      {/* Toast animation */}
      <style>{`
        .animate-toast-in {
          animation: toast-in 0.4s cubic-bezier(0.12,0.91,0.37,0.98);
        }
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(-20px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
