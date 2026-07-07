import React from 'react';

export default function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="url(#bg-gradient)" />
      {/* Saffron swoosh */}
      <path d="M 20 60 C 20 30, 50 20, 80 40 C 60 20, 30 30, 20 60 Z" fill="#FF9933" />
      {/* Green swoosh */}
      <path d="M 80 40 C 80 70, 50 80, 20 60 C 40 80, 70 70, 80 40 Z" fill="#138808" />
      {/* Ashoka Chakra Center */}
      <circle cx="50" cy="50" r="10" fill="#FFFFFF" stroke="#000080" strokeWidth="2" />
      <circle cx="50" cy="50" r="3" fill="#000080" />
      {/* Spokes (simplified) */}
      <path d="M 50 40 L 50 60 M 40 50 L 60 50 M 43 43 L 57 57 M 43 57 L 57 43" stroke="#000080" strokeWidth="1" />
      <defs>
        <linearGradient id="bg-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFC" />
          <stop offset="1" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
