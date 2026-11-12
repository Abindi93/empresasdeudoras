'use client';

import React from 'react';

export type FantiMood =
  | 'default'
  | 'detective'
  | 'worried'
  | 'confused'
  | 'happy'
  | 'writer'
  | 'sleeping';

interface FantiProps {
  mood?: FantiMood;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  animate?: boolean;
  bubbleText?: string;
}

export function Fanti({
  mood = 'default',
  size = 'md',
  className = '',
  animate = true,
  bubbleText,
}: FantiProps) {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44',
    hero: 'w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72',
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Optional Speech Bubble */}
      {bubbleText && (
        <div className="mb-2 max-w-xs px-3 py-1.5 bg-white text-[#211B35] text-xs font-semibold rounded-2xl shadow-md border border-[#8B5CF6]/20 relative text-center animate-fade-in">
          <span>{bubbleText}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-[#8B5CF6]/20 rotate-45" />
        </div>
      )}

      {/* Mascot Graphic */}
      <div
        className={`${sizeMap[size]} transition-transform duration-300 ${
          animate ? 'animate-ghost-float' : ''
        }`}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_12px_24px_rgba(139,92,246,0.18)]"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="ghostBodyGrad" x1="100" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="75%" stopColor="#FAF5FF" />
              <stop offset="100%" stopColor="#E9D5FF" />
            </linearGradient>

            <linearGradient id="ectoplasmGlow" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B8F28B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="invoiceGrad" x1="0" y1="0" x2="60" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FEF3C7" />
            </linearGradient>

            <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F472B6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ghost Aura / Glow */}
          <ellipse cx="100" cy="105" rx="72" ry="75" fill="url(#ectoplasmGlow)" opacity="0.25" filter="blur(8px)" />

          {/* Main Ghost Body */}
          <path
            d="M50 100 C50 50, 72 26, 100 26 C128 26, 150 50, 150 100 C150 145, 154 165, 142 168 C130 171, 126 155, 116 156 C106 157, 102 170, 92 169 C82 168, 80 156, 70 157 C60 158, 56 172, 46 166 C38 160, 50 135, 50 100 Z"
            fill="url(#ghostBodyGrad)"
            stroke="#8B5CF6"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Cheek Blushes */}
          <ellipse cx="68" cy="105" rx="10" ry="6" fill="url(#blushGrad)" />
          <ellipse cx="132" cy="105" rx="10" ry="6" fill="url(#blushGrad)" />

          {/* MOOD-SPECIFIC EXPRESSIONS & ACCESSORIES */}

          {/* 1. DEFAULT MOOD */}
          {mood === 'default' && (
            <g id="face-default">
              {/* Big Curious Eyes */}
              <circle cx="78" cy="88" r="9" fill="#211B35" />
              <circle cx="122" cy="88" r="9" fill="#211B35" />
              {/* Eye sparkle highlights */}
              <circle cx="81" cy="85" r="3.5" fill="#FFFFFF" />
              <circle cx="76" cy="91" r="1.5" fill="#FFFFFF" />
              <circle cx="125" cy="85" r="3.5" fill="#FFFFFF" />
              <circle cx="120" cy="91" r="1.5" fill="#FFFFFF" />
              {/* Cheeky smile */}
              <path d="M92 102 Q100 114 108 102" stroke="#211B35" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Floating Little Arms */}
              <path d="M48 104 Q34 108 42 120" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" fill="#FAF5FF" />
              <path d="M152 104 Q166 108 158 120" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" fill="#FAF5FF" />
            </g>
          )}

          {/* 2. DETECTIVE MOOD */}
          {mood === 'detective' && (
            <g id="face-detective">
              {/* Detective Hat */}
              <path
                d="M62 36 Q100 12 138 36 L148 40 Q100 32 52 40 Z"
                fill="#5B21B6"
                stroke="#211B35"
                strokeWidth="2.5"
              />
              <path
                d="M70 34 C72 18, 128 18, 130 34 Z"
                fill="#7C3AED"
                stroke="#211B35"
                strokeWidth="2.5"
              />
              {/* Shrewd Eyes */}
              <ellipse cx="78" cy="86" rx="8" ry="7" fill="#211B35" />
              <ellipse cx="122" cy="86" rx="10" ry="9" fill="#211B35" />
              <circle cx="80" cy="84" r="2.5" fill="#FFFFFF" />
              <circle cx="125" cy="83" r="4" fill="#FFFFFF" />
              {/* Smirk */}
              <path d="M94 105 Q102 112 112 103" stroke="#211B35" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Left hand holding magnifying glass */}
              <g transform="translate(118, 70)">
                {/* Glass Circle */}
                <circle cx="34" cy="34" r="24" fill="#B8F28B" fillOpacity="0.4" stroke="#FFD166" strokeWidth="5" />
                <circle cx="34" cy="34" r="20" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.7" fill="none" />
                {/* Handle */}
                <line x1="18" y1="50" x2="6" y2="68" stroke="#7C3AED" strokeWidth="7" strokeLinecap="round" />
                {/* Hand on handle */}
                <circle cx="14" cy="58" r="6" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2" />
              </g>
              {/* Right arm waving */}
              <path d="M48 106 Q32 110 40 122" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" fill="#FAF5FF" />
            </g>
          )}

          {/* 3. WORRIED MOOD (Holding Overdue Invoice) */}
          {mood === 'worried' && (
            <g id="face-worried">
              {/* Worried Eyebrows */}
              <path d="M68 76 Q78 82 86 78" stroke="#211B35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M132 76 Q122 82 114 78" stroke="#211B35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Large Wide Worried Eyes */}
              <circle cx="78" cy="90" r="10" fill="#211B35" />
              <circle cx="122" cy="90" r="10" fill="#211B35" />
              <circle cx="82" cy="87" r="4" fill="#FFFFFF" />
              <circle cx="126" cy="87" r="4" fill="#FFFFFF" />
              {/* Wavy nervous mouth */}
              <path d="M90 108 Q95 104 100 108 T110 108" stroke="#211B35" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Sweat drop on forehead */}
              <path d="M136 62 C136 66, 142 70, 142 66 C142 63, 139 59, 136 62 Z" fill="#38BDF8" />
              {/* Invoice in hands */}
              <g transform="translate(68, 108) rotate(-4)">
                <rect x="0" y="0" width="64" height="74" rx="4" fill="url(#invoiceGrad)" stroke="#8B5CF6" strokeWidth="2.5" />
                {/* Invoice text lines */}
                <line x1="8" y1="12" x2="38" y2="12" stroke="#777286" strokeWidth="3" strokeLinecap="round" />
                <line x1="8" y1="22" x2="52" y2="22" stroke="#777286" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
                <line x1="8" y1="30" x2="48" y2="30" stroke="#777286" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
                <line x1="8" y1="38" x2="54" y2="38" stroke="#777286" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
                {/* RED STAMP: VENCIDO */}
                <g transform="translate(10, 42) rotate(-10)">
                  <rect x="0" y="0" width="46" height="18" rx="2" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
                  <text x="23" y="13" textAnchor="middle" fill="#EF4444" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                    VENCIDO
                  </text>
                </g>
              </g>
              {/* Hands holding the invoice */}
              <circle cx="68" cy="130" r="6" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2.5" />
              <circle cx="134" cy="130" r="6" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2.5" />
            </g>
          )}

          {/* 4. CONFUSED MOOD (Calendar flying) */}
          {mood === 'confused' && (
            <g id="face-confused">
              {/* One raised eyebrow, one low */}
              <path d="M68 74 Q76 70 86 76" stroke="#211B35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M114 78 Q124 82 132 76" stroke="#211B35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Spiral/Swirly Eyes */}
              <ellipse cx="78" cy="88" rx="8" ry="9" fill="#211B35" />
              <ellipse cx="122" cy="88" rx="9" ry="8" fill="#211B35" />
              <path d="M78 84 A4 4 0 0 1 82 88 A4 4 0 0 1 76 90" stroke="#B8F28B" strokeWidth="2" fill="none" />
              <circle cx="124" cy="86" r="3" fill="#FFFFFF" />
              {/* Asymmetric "O" mouth */}
              <ellipse cx="100" cy="107" rx="5" ry="6" fill="#211B35" />
              {/* Question marks hovering */}
              <text x="42" y="60" fill="#FFD166" fontSize="24" fontWeight="bold" transform="rotate(-15 42 60)">?</text>
              <text x="148" y="55" fill="#8B5CF6" fontSize="20" fontWeight="bold" transform="rotate(12 148 55)">?</text>
              {/* Calendar in hands */}
              <g transform="translate(74, 115)">
                <rect x="0" y="0" width="52" height="48" rx="5" fill="#FFFFFF" stroke="#211B35" strokeWidth="2" />
                <rect x="0" y="0" width="52" height="14" rx="4" fill="#EF4444" />
                <circle cx="14" cy="7" r="2.5" fill="#FFFFFF" />
                <circle cx="38" cy="7" r="2.5" fill="#FFFFFF" />
                <text x="26" y="36" textAnchor="middle" fill="#211B35" fontSize="18" fontWeight="bold">VIER</text>
              </g>
              {/* Hands */}
              <circle cx="72" cy="132" r="6" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2" />
              <circle cx="128" cy="132" r="6" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2" />
            </g>
          )}

          {/* 5. HAPPY / CELEBRATING MOOD (Payment Received!) */}
          {mood === 'happy' && (
            <g id="face-happy">
              {/* Curved Happy Eyes (^_^) */}
              <path d="M70 88 Q80 74 90 88" stroke="#211B35" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M110 88 Q120 74 130 88" stroke="#211B35" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Star sparkles */}
              <path d="M80 62 L82 66 L86 68 L82 70 L80 74 L78 70 L74 68 L78 66 Z" fill="#FFD166" />
              <path d="M125 58 L126 61 L129 62 L126 63 L125 66 L124 63 L121 62 L124 61 Z" fill="#B8F28B" />
              {/* Big Laughing Open Mouth */}
              <path d="M88 98 Q100 124 112 98 Z" fill="#EF4444" stroke="#211B35" strokeWidth="3" strokeLinejoin="round" />
              <path d="M93 110 Q100 114 107 110" fill="#F472B6" />
              {/* Raised celebrating arms */}
              <path d="M46 95 Q28 80 40 70" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" fill="#FAF5FF" />
              <path d="M154 95 Q172 80 160 70" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" fill="#FAF5FF" />
              {/* Gold coin / Transfer celebration icon */}
              <g transform="translate(138, 55)">
                <circle cx="15" cy="15" r="14" fill="#FFD166" stroke="#F59E0B" strokeWidth="2" />
                <text x="15" y="21" textAnchor="middle" fill="#B45309" fontSize="16" fontWeight="bold">$</text>
              </g>
              {/* Confetti specks */}
              <circle cx="48" cy="45" r="3" fill="#B8F28B" />
              <rect x="145" y="90" width="5" height="5" fill="#8B5CF6" transform="rotate(25 145 90)" />
              <circle cx="60" cy="30" r="2.5" fill="#FFD166" />
            </g>
          )}

          {/* 6. WRITER / POPCORN MOOD (Listening to Gossip) */}
          {mood === 'writer' && (
            <g id="face-writer">
              {/* Popcorn box */}
              <g transform="translate(72, 104)">
                {/* Popcorn bucket */}
                <path d="M10 24 L16 68 L44 68 L50 24 Z" fill="#EF4444" stroke="#211B35" strokeWidth="2.5" />
                {/* White stripes on bucket */}
                <path d="M22 24 L24 68 L30 68 L28 24 Z" fill="#FFFFFF" />
                <path d="M36 24 L38 68 L44 68 L42 24 Z" fill="#FFFFFF" />
                {/* Label CHISME */}
                <rect x="12" y="38" width="36" height="16" rx="3" fill="#FFD166" stroke="#211B35" strokeWidth="1.5" />
                <text x="30" y="49" textAnchor="middle" fill="#211B35" fontSize="7" fontWeight="bold">CHISME</text>
                {/* Fluffy Popcorn kernels */}
                <circle cx="18" cy="20" r="8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                <circle cx="30" cy="16" r="9" fill="#FFFBEB" stroke="#CA8A04" strokeWidth="1.5" />
                <circle cx="42" cy="20" r="8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                <circle cx="24" cy="12" r="7" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.5" />
                <circle cx="36" cy="11" r="7" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
              </g>
              {/* Wide Popcorn-eating Eyes */}
              <circle cx="78" cy="85" r="9.5" fill="#211B35" />
              <circle cx="122" cy="85" r="9.5" fill="#211B35" />
              <circle cx="82" cy="82" r="4" fill="#FFFFFF" />
              <circle cx="126" cy="82" r="4" fill="#FFFFFF" />
              {/* Happy curved mouth munching */}
              <path d="M92 98 Q100 106 108 98" stroke="#211B35" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Little arms holding bucket */}
              <circle cx="78" cy="128" r="6" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2.5" />
              <circle cx="122" cy="128" r="6" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2.5" />
            </g>
          )}

          {/* 7. SLEEPING MOOD (Waiting forever for wire transfer) */}
          {mood === 'sleeping' && (
            <g id="face-sleeping">
              {/* Closed curved sleeping eyes */}
              <path d="M70 90 Q80 98 90 90" stroke="#211B35" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M110 90 Q120 98 130 90" stroke="#211B35" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {/* Cute sleeping bubble / mouth */}
              <ellipse cx="100" cy="106" rx="4" ry="5" fill="#211B35" />
              <circle cx="108" cy="100" r="5" fill="#93C5FD" fillOpacity="0.7" stroke="#3B82F6" strokeWidth="1" />
              {/* Floating Z z z letters */}
              <text x="135" y="70" fill="#8B5CF6" fontSize="16" fontWeight="bold">Z</text>
              <text x="146" y="52" fill="#8B5CF6" fontSize="13" fontWeight="bold">z</text>
              <text x="154" y="38" fill="#8B5CF6" fontSize="10" fontWeight="bold">z</text>
              {/* Little spiderweb on left shoulder */}
              <path d="M48 60 L62 70 M52 54 L68 72 M48 72 L62 56" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
              {/* Hands resting peacefully on tummy */}
              <path d="M68 136 Q80 144 92 136" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" fill="#FAF5FF" />
              <path d="M132 136 Q120 144 108 136" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" fill="#FAF5FF" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

export function FantiDetective(props: Omit<FantiProps, 'mood'>) {
  return <Fanti mood="detective" {...props} />;
}

export function FantiHappy(props: Omit<FantiProps, 'mood'>) {
  return <Fanti mood="happy" {...props} />;
}

export function FantiWorried(props: Omit<FantiProps, 'mood'>) {
  return <Fanti mood="worried" {...props} />;
}

export function FantiWaiting(props: Omit<FantiProps, 'mood'>) {
  return <Fanti mood="sleeping" {...props} />;
}

export function FantiWriter(props: Omit<FantiProps, 'mood'>) {
  return <Fanti mood="writer" {...props} />;
}
