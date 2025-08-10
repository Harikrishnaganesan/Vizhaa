
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
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const labelFloat = isFocused || email.length > 0;

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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Forget Password</h2>
            <p className="text-sm text-gray-500">Enter Email to Reset Password</p>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              onNext();
            }}
          >
            <div className="relative mb-6 h-16 flex items-center">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setEmail(e.target.value)}
                className={`
                  peer w-full pl-3 pr-3 py-4 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-transparent
                  outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300
                `}
                placeholder="Email"
                autoComplete="off"
                required
              />
              <label
                htmlFor="email"
                className={`
                  absolute bg-white px-1 text-gray-500 transition-all duration-300 pointer-events-none z-20
                  ${labelFloat
                    ? 'top-0 left-3 text-xs text-blue-600 transform translate-y-0'
                    : 'top-1/2 left-3 text-base -translate-y-1/2'}
                `}
                style={{ transitionProperty: 'top, left, font-size, transform' }}
              >
                Email
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#253C51] text-white text-lg font-semibold rounded-md py-2 mt-2 transition hover:bg-[#2A4F71] shadow"
            >
              Send OTP
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

// ---- LOGIN VIEW with dummy credentials and redirect ----
function LoginView({ onForgot }: { onForgot: () => void }) {
  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const emailLabelFloat = isEmailFocused || email.length > 0;
  const passwordLabelFloat = isPasswordFocused || password.length > 0;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy credentials
    if (
      (email === 'mani@gmail.com' && password === 'mani123') ||
      (email === 'hari@gmail.com' && password === 'hari123')
    ) {
      setError('');
      router.push('/home'); // Redirect to new home page
    } else {
      setError('Invalid login credentials. Try: mani@gmail.com / mani123 or hari@gmail.com / hari123');
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
            {/* Email Input */}
            <div className="mb-6 relative h-16 flex items-center">
              <button
                type="button"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 hover:text-blue-500 focus:outline-none z-10"
                aria-label="Clear email"
                onClick={() => setEmail('')}
                tabIndex={0}
              >
                <FaEnvelope />
              </button>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                className={`
                  peer pl-11 pr-3 py-4 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-transparent outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300
                  ${emailLabelFloat ? 'w-[110%]' : 'w-full'}
                `}
                placeholder="Email"
                autoComplete="off"
                required
                style={{ transitionProperty: 'width' }}
              />
              <label
                htmlFor="email"
                className={`
                  absolute bg-white px-1 text-gray-500 transition-all duration-300 pointer-events-none z-20
                  ${emailLabelFloat
                    ? 'top-0 left-3 text-xs text-blue-600 transform translate-y-0'
                    : 'top-1/2 left-11 text-base -translate-y-1/2'}
                `}
                style={{ transitionProperty: 'top, left, font-size, transform' }}
              >
                Email
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
              className="w-full mt-2 py-3 rounded-md bg-[#253C51] text-white text-lg font-semibold transition hover:bg-[#2A4F71] shadow"
            >
              Sign in
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
