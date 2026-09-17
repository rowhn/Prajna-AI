// src/components/common/Logo.jsx
import React from 'react';

const Logo = ({ size = 40, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      className={className}
      role="img"
      aria-label="Prajñā AI logo"
    >
      <defs>
        <linearGradient id="prajna-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f46e5" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      <rect width="160" height="160" rx="32" fill="url(#prajna-logo-grad)" />

      <g stroke="#ffffff">
        <line x1="80" y1="80" x2="80" y2="45" strokeOpacity="0.6" strokeWidth="2" />
        <line x1="80" y1="80" x2="50" y2="100" strokeOpacity="0.6" strokeWidth="2" />
        <line x1="80" y1="80" x2="110" y2="100" strokeOpacity="0.6" strokeWidth="2" />
        <line x1="80" y1="45" x2="50" y2="100" strokeOpacity="0.9" strokeWidth="2.5" />
        <line x1="80" y1="45" x2="110" y2="100" strokeOpacity="0.9" strokeWidth="2.5" />
        <line x1="50" y1="100" x2="110" y2="100" strokeOpacity="0.9" strokeWidth="2.5" />
      </g>

      <circle cx="80" cy="45" r="9" fill="#ffffff" />
      <circle cx="50" cy="100" r="9" fill="#ffffff" />
      <circle cx="110" cy="100" r="9" fill="#ffffff" />
      <circle cx="80" cy="80" r="6" fill="#ffffff" />
    </svg>
  );
};

export default Logo;