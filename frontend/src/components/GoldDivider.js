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
      
      {/* Elegant Gold Divider SVG - similar to the uploaded image */}
      <svg 
        viewBox="0 0 600 80" 
        className="relative z-10 w-80 sm:w-[28rem] md:w-[36rem] lg:w-[42rem] h-auto"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
        }}
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f4e4a6" />
            <stop offset="30%" stopColor="#d4af37" />
            <stop offset="60%" stopColor="#b8932c" />
            <stop offset="100%" stopColor="#8b7620" />
          </linearGradient>
        </defs>
        
        {/* Center ornament - triple loop design */}
        <g transform="translate(300, 25)">
          {/* Top loop */}
          <ellipse cx="0" cy="-8" rx="12" ry="10" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" />
          
          {/* Left loop */}
          <ellipse cx="-15" cy="8" rx="10" ry="12" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" />
          
          {/* Right loop */}
          <ellipse cx="15" cy="8" rx="10" ry="12" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" />
          
          {/* Center connection */}
          <circle cx="0" cy="5" r="4" fill="url(#goldGrad)" />
        </g>
        
        {/* Left flowing curves */}
        <path 
          d="M 240 40 
             Q 220 30 200 35 
             Q 180 40 170 35 
             Q 150 25 130 35 
             Q 110 45 80 40 
             Q 50 35 20 42" 
          stroke="url(#goldGrad)" 
          strokeWidth="2.5" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Left lower curve */}
        <path 
          d="M 245 45 
             Q 220 55 190 50 
             Q 160 45 140 55 
             Q 110 65 70 55 
             Q 40 48 15 55" 
          stroke="url(#goldGrad)" 
          strokeWidth="2" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Left end curl */}
        <path 
          d="M 20 42 Q 5 38 10 50 Q 15 60 5 65" 
          stroke="url(#goldGrad)" 
          strokeWidth="2" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Right flowing curves */}
        <path 
          d="M 360 40 
             Q 380 30 400 35 
             Q 420 40 430 35 
             Q 450 25 470 35 
             Q 490 45 520 40 
             Q 550 35 580 42" 
          stroke="url(#goldGrad)" 
          strokeWidth="2.5" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Right lower curve */}
        <path 
          d="M 355 45 
             Q 380 55 410 50 
             Q 440 45 460 55 
             Q 490 65 530 55 
             Q 560 48 585 55" 
          stroke="url(#goldGrad)" 
          strokeWidth="2" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Right end curl */}
        <path 
          d="M 580 42 Q 595 38 590 50 Q 585 60 595 65" 
          stroke="url(#goldGrad)" 
          strokeWidth="2" 
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default GoldDivider;
