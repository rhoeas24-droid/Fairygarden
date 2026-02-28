import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[60vh] sm:min-h-[65vh] md:min-h-[75vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-forest"
    >
      {/* Background image - contain on mobile, cover on desktop */}
      <div 
        className="absolute inset-0 bg-contain bg-center bg-no-repeat sm:bg-cover"
        style={{
          backgroundImage: 'url(/HEADER_ENH.jpg)',
        }}
      />
      <div className="absolute inset-0 bg-forest/30 sm:bg-forest/40" />
    </section>
  );
};

export default Hero;