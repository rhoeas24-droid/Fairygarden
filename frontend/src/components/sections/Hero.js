import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-forest"
    >
      {/* Background image - contain on mobile to show full image, cover on larger screens */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/HEADER_ENH.jpg)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Darker overlay on sides for mobile where bg-contain leaves gaps */}
      <div className="absolute inset-0 bg-forest/20" />
    </section>
  );
};

export default Hero;