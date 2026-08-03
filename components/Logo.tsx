import React from 'react';

interface LogoProps {
  className?: string;
}

// Target (objectif) + check (réussite) mark. Kept to two colors (sapphire/amber)
// so it reads at 16px favicon size as well as in the header/footer.
export const Logo: React.FC<LogoProps> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 512 512" className={className} role="img" aria-label="Objectif Citoyen">
    <rect width="512" height="512" rx="115" fill="#1d4ed8" />
    <circle cx="256" cy="256" r="150" fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="26" />
    <circle cx="256" cy="256" r="92" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="24" />
    <path
      d="M180 266 L232 320 L342 196"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="40"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
