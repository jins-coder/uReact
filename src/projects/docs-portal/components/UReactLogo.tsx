import React from 'react';

export interface UReactLogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  animated?: boolean;
}

export function UReactLogo({
  size = 32,
  className = '',
  style = {},
  animated = true
}: UReactLogoProps) {
  const id = React.useId().replace(/:/g, '');
  const gradId = `ureact-logo-grad-${id}`;
  const accentId = `ureact-logo-accent-${id}`;
  const glowId = `ureact-logo-glow-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ureact-logo ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style
      }}
      aria-label="uReact Logo"
    >
      <defs>
        {/* Main Brand Gradient: React Cyan to Electric Indigo */}
        <linearGradient id={gradId} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="45%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        {/* Quantum Accent: Neon Cyan to Emerald Reactive */}
        <linearGradient id={accentId} x1="16" y1="16" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>

        {/* Soft Ambient Glow */}
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Atomic Orbital Ring 1: -30 deg */}
      <ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="7.8"
        transform="rotate(-30 24 24)"
        stroke={`url(#${gradId})`}
        strokeWidth="2.2"
        strokeOpacity="0.8"
        className={animated ? 'ureact-orbit ureact-orbit-1' : ''}
      />

      {/* Atomic Orbital Ring 2: +30 deg */}
      <ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="7.8"
        transform="rotate(30 24 24)"
        stroke={`url(#${gradId})`}
        strokeWidth="2.2"
        strokeOpacity="0.8"
        className={animated ? 'ureact-orbit ureact-orbit-2' : ''}
      />

      {/* Horizontal Ambient Electron Ring */}
      <ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="7.8"
        transform="rotate(90 24 24)"
        stroke={`url(#${gradId})`}
        strokeWidth="1.5"
        strokeOpacity="0.35"
        strokeDasharray="2 3"
      />

      {/* The Iconic Geometric "u" Core */}
      <path
        d="M 16.5 15.5 V 25.5 C 16.5 29.6 19.8 33 24 33 C 28.2 33 31.5 29.6 31.5 25.5 V 15.5"
        stroke={`url(#${gradId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Leg of the "u" */}
      <path
        d="M 31.5 23.5 V 33"
        stroke={`url(#${gradId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Central Reactive Nucleus Node */}
      <circle
        cx="24"
        cy="24"
        r="2.8"
        fill={`url(#${accentId})`}
        filter={`url(#${glowId})`}
      />

      {/* Orbiting Quantum Electron Beads */}
      <circle cx="8.5" cy="15" r="2.2" fill="#38bdf8" />
      <circle cx="39.5" cy="33" r="2.2" fill="#6366f1" />
      <circle cx="39.5" cy="15" r="2.2" fill="#10b981" />
    </svg>
  );
}
