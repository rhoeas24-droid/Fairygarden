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
      <img 
        src="/gold_divider.png" 
        alt="" 
        className="relative z-10 w-72 sm:w-96 md:w-[28rem] lg:w-[36rem] h-auto object-contain"
        style={{
          filter: 'drop-shadow(0 2px 6px rgba(212,175,55,0.4))'
        }}
      />
    </div>
  );
};

export default GoldDivider;
