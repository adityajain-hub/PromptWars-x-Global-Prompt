import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Check if user is logged in from local storage
    const storedUser = localStorage.getItem('smartbharat_user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUserProfile(JSON.parse(storedUser));
    }
  }, []);

  const login = (aadhaarNumber, otp) => {
    // Mock login logic
    if (aadhaarNumber.length === 12 && otp.length === 6) {
      const profile = {
        name: 'Aditya Jain',
        aadhaar: 'XXXX-XXXX-' + aadhaarNumber.slice(-4),
        dob: '01/01/2000',
        state: 'Rajasthan',
        verified: true
      };
      setIsLoggedIn(true);
      setUserProfile(profile);
      localStorage.setItem('smartbharat_user', JSON.stringify(profile));
      return { success: true };
    }
    return { success: false, error: 'Invalid Aadhaar or OTP' };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    localStorage.removeItem('smartbharat_user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
