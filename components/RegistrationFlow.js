import { useState } from 'react';
import { authAPI } from '../services/api.js';

const RegistrationFlow = ({ userType }) => {
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendOTP = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await authAPI.sendOTP(phone, userType);
      setSessionId(result.sessionId);
      setStep('otp');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    setError('');
    try {
      await authAPI.verifyOTP(sessionId, otp, phone);
      setStep('register');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const completeRegistration = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const registrationData = {
        phone,
        sessionId,
        ...formData
      };

      const result = userType === 'organizer' 
        ? await authAPI.organizerSignup(registrationData)
        : await authAPI.supplierSignup(registrationData);

      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userType', result.user.userType);
      
      window.location.href = `/${userType}/dashboard`;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div style={{color: 'red'}}>{error}</div>}
      
      {step === 'phone' && (
        <div>
          <h2>{userType} Registration</h2>
          <input 
            type="tel" 
            placeholder="Enter mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOTP} disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </div>
      )}

      {step === 'otp' && (
        <div>
          <h2>Verify Mobile Number</h2>
          <p>OTP sent to {phone}</p>
          <input 
            type="text" 
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
          />
          <button onClick={verifyOTP} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          <button onClick={sendOTP} disabled={loading}>Resend OTP</button>
        </div>
      )}

      {step === 'register' && (
        <RegistrationForm 
          userType={userType}
          onSubmit={completeRegistration}
          loading={loading}
        />
      )}
    </div>
  );
};

const RegistrationForm = ({ userType, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    services: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Complete Registration</h2>
      
      <input 
        type="text" 
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
        required
      />
      
      <input 
        type="email" 
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      
      <input 
        type="password" 
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
      />

      {userType === 'organizer' && (
        <input 
          type="text" 
          placeholder="Company Name"
          value={formData.companyName}
          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
        />
      )}

      {userType === 'supplier' && (
        <input 
          type="text" 
          placeholder="Services (comma separated)"
          onChange={(e) => setFormData({...formData, services: e.target.value.split(',')})}
        />
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating Account...' : 'Complete Registration'}
      </button>
    </form>
  );
};

export default RegistrationFlow;