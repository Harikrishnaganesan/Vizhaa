"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const SupplierSignUp: React.FC<{ onBack?: () => void }> = () => {
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
  const [aadharFile, setAadharFile] = useState<File | null>(null);
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // 1: Details, 2: OTP, 3: Complete

  const [countdown, setCountdown] = useState(0);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setValidationErrors(prev => ({
          ...prev,
          aadhar: 'Please select a valid file type (JPEG, PNG, PDF)'
        }));
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          aadhar: 'File size must be less than 5MB'
        }));
        return;
      }
      
      setAadharFile(file);
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.aadhar;
        return newErrors;
      });
    }
  };

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Validation functions
  const validateStep1 = () => {
    const errors: Record<string, string> = {};

    if (!form.name.trim()) errors.name = "Full name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Email is invalid";
    
    if (!form.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone)) errors.phone = "Phone number must be 10 digits";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};

    if (!form.otp.trim()) errors.otp = "OTP is required";
    else if (!/^\d{6}$/.test(form.otp)) errors.otp = "OTP must be 6 digits";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const errors: Record<string, string> = {};

    if (!form.password.trim()) errors.password = "Password is required";
    else if (form.password.length < 6) errors.password = "Password must be at least 6 characters";
    
    if (!form.confirmPassword.trim()) errors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match";
    
    if (!form.dob.trim()) errors.dob = "Date of birth is required";
    
    if (!form.gender.trim()) errors.gender = "Gender is required";
    
    if (!aadharFile) errors.aadhar = "Aadhar card is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendOTP = async () => {
    if (!validateStep1()) {
      setMessage("Please fix the validation errors");
      return;
    }

    setLoading(true);
    setMessage("");
    
    try {
      const { authAPI } = await import('../../../../services/api.js');
      const result = await authAPI.sendOTP(form.phone, 'supplier');
      setSessionId(result.sessionId);
      setStep(2);
      setCountdown(60);
      setMessage("OTP sent successfully to your phone!");
    } catch (error: unknown) {
      console.error("OTP send error:", error);
      let errorMessage = "Failed to send OTP. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!validateStep2()) {
      setMessage("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setMessage("");
    
    try {
      const { authAPI } = await import('../../../../services/api.js');
      await authAPI.verifyOTP(sessionId, form.otp, form.phone);
      setStep(3);
      setMessage("Phone verified successfully! Please complete your registration.");
    } catch (error: unknown) {
      console.error("OTP verify error:", error);
      let errorMessage = "OTP verification failed. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setLoading(true);
    setMessage("");
    
    try {
      const { authAPI } = await import('../../../../services/api.js');
      const result = await authAPI.sendOTP(form.phone, 'supplier');
      setSessionId(result.sessionId);
      setCountdown(60);
      setMessage("OTP resent successfully!");
    } catch (error: unknown) {
      console.error("OTP resend error:", error);
      let errorMessage = "Failed to resend OTP. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setMessage(errorMessage);
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

    if (!validateStep3()) {
      setMessage("Please fix the validation errors");
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
      sessionId: sessionId,
      services: "General Services" // Add default services
    };

    try {
      const { authAPI } = await import('../../../../services/api.js');
      await authAPI.supplierSignup(userData);
      setMessage("Registration successful! Redirecting to login...");
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration error details:", {
        originalError: error,
        message: error instanceof Error ? error.message : 'Unknown error',
        data: error instanceof Error ? (error as Error & {data?: unknown}).data : undefined,
        stack: error instanceof Error ? error.stack : undefined
      });

      // Handle different types of errors
      let errorMessage = "Registration failed. Please try again.";
      
      if (error instanceof Error && ((error as Error & {data?: unknown}).data || (error as Error & {response?: {data?: unknown}}).response?.data)) {
        const errorData = (error as Error & {data?: unknown}).data || (error as Error & {response?: {data?: unknown}}).response?.data;
        
        // Check for validation errors
        if (errorData && typeof errorData === 'object' && 'errors' in errorData) {
          setValidationErrors(errorData.errors as Record<string, string>);
          errorMessage = "Please fix the validation errors";
        } 
        // Check for specific error messages
        else if (errorData && typeof errorData === 'object' && 'message' in errorData) {
          errorMessage = errorData.message as string;
        }
        
        // Check for specific error types
        if (errorData && typeof errorData === 'object' && 'code' in errorData) {
          if (errorData.code === "FILE_TOO_LARGE") {
            errorMessage = "Aadhar file is too large. Please upload a smaller file (max 5MB)";
          } else if (errorData.code === "INVALID_FILE_TYPE") {
            errorMessage = "Invalid file type. Please upload JPG, PNG, or PDF file";
          } else if (errorData.code === "USER_EXISTS") {
            errorMessage = "A user already exists with this phone number or email";
          }
        }
      } else if (error instanceof Error && error.message.includes('internet connection')) {
        errorMessage = error.message;
      } else {
        // Log the complete error for debugging
        console.error('Unhandled error during registration:', error);
      }

      setMessage(errorMessage);
      
      if (!errorMessage.includes("validation errors")) {
        // Clear form-specific errors if it's not a validation error
        setValidationErrors({});
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, dob: e.target.value }));
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
                  <div>
                    <input 
                      name="name" 
                      type="text" 
                      placeholder="Full Name" 
                      value={form.name} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 ${
                        validationErrors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-400'
                      }`} 
                      required 
                    />
                    {validationErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <input 
                      name="email" 
                      type="email" 
                      placeholder="Email" 
                      value={form.email} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 ${
                        validationErrors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-400'
                      }`} 
                      required 
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex gap-2">
                      <input 
                        name="phone" 
                        type="tel" 
                        placeholder="Phone Number" 
                        value={form.phone} 
                        onChange={handleChange} 
                        className={`flex-1 px-4 py-3 border rounded focus:outline-none focus:ring-2 ${
                          validationErrors.phone ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-400'
                        }`} 
                        required 
                        pattern="[0-9]{10}" 
                        maxLength={10}
                      />
                      <button 
                        type="button" 
                        onClick={handleSendOTP} 
                        disabled={loading}
                        className="bg-[#2DBE60] text-white px-4 py-3 rounded font-semibold whitespace-nowrap disabled:opacity-50"
                      >
                        {loading ? 'Sending...' : 'Send OTP'}
                      </button>
                    </div>
                    {validationErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                    )}
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
                  
                  <div>
                    <input 
                      name="otp" 
                      type="text" 
                      placeholder="Enter 6-digit OTP" 
                      value={form.otp} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 ${
                        validationErrors.otp ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-400'
                      }`} 
                      required 
                      maxLength={6}
                      pattern="[0-9]{6}"
                    />
                    {validationErrors.otp && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.otp}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={handleVerifyOTP} 
                      disabled={loading}
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
                  <div>
                    <input 
                      name="password" 
                      type="password" 
                      placeholder="Password" 
                      value={form.password} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 ${
                        validationErrors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-400'
                      }`} 
                      required 
                      minLength={6}
                    />
                    {validationErrors.password && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
                    )}
                  </div>
                  
                  <div>
                    <input 
                      name="confirmPassword" 
                      type="password" 
                      placeholder="Confirm Password" 
                      value={form.confirmPassword} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 ${
                        validationErrors.confirmPassword ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-400'
                      }`} 
                      required 
                    />
                    {validationErrors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Date of Birth</label>
                    <input 
                      name="dob" 
                      type="date" 
                      value={form.dob} 
                      onChange={handleDateChange} 
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 ${
                        validationErrors.dob ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-400'
                      }`} 
                      required 
                    />
                    {validationErrors.dob && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.dob}</p>
                    )}
                  </div>
                  
                  <div>
                    <select 
                      name="gender" 
                      value={form.gender} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 ${
                        validationErrors.gender ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-400'
                      }`} 
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {validationErrors.gender && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.gender}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Aadhar Card</label>
                    <div className={`border rounded p-3 focus-within:ring-2 ${
                      validationErrors.aadhar ? 'border-red-500 focus-within:ring-red-400' : 'border-gray-300 focus-within:ring-green-400'
                    }`}>
                      <input 
                        ref={fileInputRef}
                        name="aadhar" 
                        type="file" 
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        required 
                      />
                      {aadharFile && (
                        <p className="text-sm text-green-600 mt-2">
                          Selected: {aadharFile.name} ({Math.round(aadharFile.size / 1024)} KB)
                        </p>
                      )}
                    </div>
                    {validationErrors.aadhar && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.aadhar}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted formats: JPG, PNG, PDF (Max 5MB)
                    </p>
                  </div>
                  
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
            onClick={() => router.push('/login')}
            disabled={loading}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierSignUp;