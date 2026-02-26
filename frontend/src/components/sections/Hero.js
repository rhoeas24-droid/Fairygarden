import React from 'react';
import { motion } from 'framer-motion';
import GoldButton from '../GoldButton';

const Hero = () => {
  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/HEADER_ENH.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-forest/40" />
      
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.img
          src="/FullLogo_NoBuffer.png"
          alt="Fairygarden For You"
          className="w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 drop-shadow-[0_0_30px_rgba(201,168,76,0.5)]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          data-testid="hero-logo"
        />
        
        <motion.p
          className="text-2xl md:text-3xl font-playfair italic text-gold-light mb-12 drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          data-testid="hero-tagline"
        >
          A Touch of Magic in a Bottle
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <GoldButton onClick={scrollToGallery} dataTestId="explore-magic-button">
            Explore the Magic
          </GoldButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;