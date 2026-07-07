import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Aadhaar, 2: OTP
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (aadhaar.replace(/\s/g, '').length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }
    setError('');
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      const cleanAadhaar = aadhaar.replace(/\s/g, '');
      const result = login(cleanAadhaar, otp);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    }, 1000);
  };

  return (
    <div className="container animate-fade-in" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '450px', width: '100%', background: 'var(--bg-card)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Sign In</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Login with MeriPehchaan (DigiLocker)</p>
          <div style={{ display: 'inline-block', padding: '5px 10px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', marginTop: '10px' }}>
            ✓ Secure Mock Authentication
          </div>
        </div>

        {error && (
          <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-sm)', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOTP}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Aadhaar Number</label>
              <input 
                type="text" 
                placeholder="XXXX XXXX XXXX" 
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value.replace(/[^0-9\s]/g, ''))}
                maxLength="14"
                style={{ width: '100%', padding: '12px 15px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '12px' }}
              disabled={isLoading}
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Enter OTP sent to registered mobile</label>
              <input 
                type="text" 
                placeholder="XXXXXX" 
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength="6"
                style={{ width: '100%', padding: '12px 15px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', color: 'var(--text-primary)', textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem' }}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '12px', background: 'var(--accent-green)', borderColor: 'var(--accent-green)' }}
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Sign In'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
