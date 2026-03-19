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
      
      {/* Elegant Gold Divider - matching the pngtree reference */}
      <svg 
        viewBox="0 0 800 120" 
        className="relative z-10 w-80 sm:w-[32rem] md:w-[42rem] lg:w-[52rem] h-auto"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
        }}
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5e6a3" />
            <stop offset="25%" stopColor="#e8c84a" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="75%" stopColor="#b8962e" />
            <stop offset="100%" stopColor="#8b7620" />
          </linearGradient>
          <linearGradient id="goldGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#faf0c8" />
            <stop offset="50%" stopColor="#e8c84a" />
            <stop offset="100%" stopColor="#c9a227" />
          </linearGradient>
        </defs>
        
        {/* Center ornament */}
        <g transform="translate(400, 60)">
          {/* Top loop */}
          <ellipse cx="0" cy="-25" rx="18" ry="15" stroke="url(#goldGradient)" strokeWidth="3" fill="none" />
          
          {/* Bottom left loop */}
          <ellipse cx="-18" cy="0" rx="15" ry="18" stroke="url(#goldGradient)" strokeWidth="3" fill="none" />
          
          {/* Bottom right loop */}
          <ellipse cx="18" cy="0" rx="15" ry="18" stroke="url(#goldGradient)" strokeWidth="3" fill="none" />
          
          {/* Center small circle */}
          <circle cx="0" cy="-5" r="6" stroke="url(#goldGradient)" strokeWidth="2.5" fill="none" />
          <circle cx="0" cy="-5" r="2" fill="url(#goldGradient)" />
        </g>
        
        {/* Left side - upper flowing line */}
        <path 
          d="M 330 55 
             C 300 50, 250 45, 200 50
             C 150 55, 100 50, 50 55
             C 30 57, 15 52, 5 45" 
          stroke="url(#goldGradient)" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Left side - lower flowing line */}
        <path 
          d="M 330 70 
             C 300 75, 250 80, 200 75
             C 150 70, 100 75, 50 70
             C 30 68, 15 73, 5 80" 
          stroke="url(#goldGradient)" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Left curl end - top */}
        <path 
          d="M 5 45 C -5 38, -10 45, -5 55 C 0 62, -8 68, -15 65" 
          stroke="url(#goldGradient)" 
          strokeWidth="2.5" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Left curl end - bottom */}
        <path 
          d="M 5 80 C -5 87, -10 80, -5 70 C 0 63, -8 57, -15 60" 
          stroke="url(#goldGradient)" 
          strokeWidth="2.5" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Right side - upper flowing line */}
        <path 
          d="M 470 55 
             C 500 50, 550 45, 600 50
             C 650 55, 700 50, 750 55
             C 770 57, 785 52, 795 45" 
          stroke="url(#goldGradient)" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Right side - lower flowing line */}
        <path 
          d="M 470 70 
             C 500 75, 550 80, 600 75
             C 650 70, 700 75, 750 70
             C 770 68, 785 73, 795 80" 
          stroke="url(#goldGradient)" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Right curl end - top */}
        <path 
          d="M 795 45 C 805 38, 810 45, 805 55 C 800 62, 808 68, 815 65" 
          stroke="url(#goldGradient)" 
          strokeWidth="2.5" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Right curl end - bottom */}
        <path 
          d="M 795 80 C 805 87, 810 80, 805 70 C 800 63, 808 57, 815 60" 
          stroke="url(#goldGradient)" 
          strokeWidth="2.5" 
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default GoldDivider;
