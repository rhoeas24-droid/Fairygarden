import React from 'react';

const GoldDivider = () => {
  return (
    <div 
      className="w-full py-8 sm:py-10 md:py-12 flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-forest/90" />
      
      {/* SVG Decorative Divider - Ornate Gold Design */}
      <svg 
        viewBox="0 0 500 100" 
        className="relative z-10 w-72 sm:w-96 md:w-[28rem] lg:w-[32rem] h-auto"
        style={{
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))'
        }}
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f4d875" />
            <stop offset="30%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#c9a84c" />
            <stop offset="70%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#8b7620" />
          </linearGradient>
          <linearGradient id="goldGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b7620" />
            <stop offset="50%" stopColor="#f4d875" />
            <stop offset="100%" stopColor="#8b7620" />
          </linearGradient>
        </defs>
        
        {/* Center piece - fleur de lis style */}
        <g transform="translate(250, 50)">
          {/* Main vertical spike */}
          <path 
            d="M 0 -35 Q 3 -25 0 -15 Q -3 -25 0 -35" 
            fill="url(#goldGradient)"
          />
          <path 
            d="M 0 -30 Q 8 -20 5 -10 Q 0 -5 0 -10 Q 0 -5 -5 -10 Q -8 -20 0 -30" 
            fill="url(#goldGradient)"
          />
          
          {/* Side petals */}
          <path 
            d="M -15 -15 Q -25 -25 -20 -10 Q -15 0 -8 -5" 
            fill="url(#goldGradient)"
          />
          <path 
            d="M 15 -15 Q 25 -25 20 -10 Q 15 0 8 -5" 
            fill="url(#goldGradient)"
          />
          
          {/* Scrollwork left */}
          <path 
            d="M -20 5 Q -35 0 -40 15 Q -45 30 -30 25 Q -20 20 -25 10" 
            stroke="url(#goldGradient)" 
            strokeWidth="3" 
            fill="none"
          />
          <path 
            d="M -35 20 Q -45 15 -50 25 Q -55 35 -45 30" 
            stroke="url(#goldGradient)" 
            strokeWidth="2.5" 
            fill="none"
          />
          
          {/* Scrollwork right */}
          <path 
            d="M 20 5 Q 35 0 40 15 Q 45 30 30 25 Q 20 20 25 10" 
            stroke="url(#goldGradient)" 
            strokeWidth="3" 
            fill="none"
          />
          <path 
            d="M 35 20 Q 45 15 50 25 Q 55 35 45 30" 
            stroke="url(#goldGradient)" 
            strokeWidth="2.5" 
            fill="none"
          />
          
          {/* Center circle */}
          <circle cx="0" cy="15" r="5" fill="url(#goldGradient)" />
        </g>
        
        {/* Left decorative line */}
        <g>
          <path 
            d="M 60 50 Q 100 50 140 50" 
            stroke="url(#goldGradientH)" 
            strokeWidth="2" 
            fill="none"
          />
          <circle cx="55" cy="50" r="4" fill="url(#goldGradient)" />
          
          {/* Left scroll */}
          <path 
            d="M 80 50 Q 70 35 85 30 Q 100 25 95 40 Q 90 50 100 50" 
            stroke="url(#goldGradient)" 
            strokeWidth="2.5" 
            fill="none"
          />
          <path 
            d="M 100 50 Q 110 65 95 70 Q 80 75 85 60 Q 90 50 80 50" 
            stroke="url(#goldGradient)" 
            strokeWidth="2.5" 
            fill="none"
          />
        </g>
        
        {/* Right decorative line */}
        <g>
          <path 
            d="M 360 50 Q 400 50 440 50" 
            stroke="url(#goldGradientH)" 
            strokeWidth="2" 
            fill="none"
          />
          <circle cx="445" cy="50" r="4" fill="url(#goldGradient)" />
          
          {/* Right scroll */}
          <path 
            d="M 420 50 Q 430 35 415 30 Q 400 25 405 40 Q 410 50 400 50" 
            stroke="url(#goldGradient)" 
            strokeWidth="2.5" 
            fill="none"
          />
          <path 
            d="M 400 50 Q 390 65 405 70 Q 420 75 415 60 Q 410 50 420 50" 
            stroke="url(#goldGradient)" 
            strokeWidth="2.5" 
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

export default GoldDivider;
