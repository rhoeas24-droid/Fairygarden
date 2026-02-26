import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import GoldButton from '../GoldButton';

const MagicalDivider = () => {
  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 overflow-hidden" style={{
      backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="absolute inset-0 bg-forest/90" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          {/* Top sparkle decorations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute -top-8 -left-8"
            >
              <Sparkles className="w-8 h-8 text-gold drop-shadow-[0_0_10px_rgba(201,168,76,0.8)]" />
            </motion.div>
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute -top-8 -right-8"
            >
              <Sparkles className="w-6 h-6 text-gold-light drop-shadow-[0_0_8px_rgba(240,230,140,0.8)]" />
            </motion.div>
          </motion.div>

          {/* Sparkle divider image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <motion.img
              src="/sparkle-divider.png"
              alt="Magical sparkles"
              className="w-full max-w-2xl h-auto opacity-80"
              animate={{
                filter: [
                  'brightness(1) saturate(1)',
                  'brightness(1.2) saturate(1.3)',
                  'brightness(1) saturate(1)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            
            {/* Floating sparkle particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2
                }}
              >
                <div className="w-2 h-2 bg-gold rounded-full blur-[1px] shadow-[0_0_8px_rgba(201,168,76,0.9)]" />
              </motion.div>
            ))}
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <GoldButton onClick={scrollToGallery} dataTestId="explore-magic-button">
              Explore the Magic
            </GoldButton>
            
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gold/20 blur-xl -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </motion.div>

          {/* Bottom sparkle decorations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative mt-4"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.15, 1]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute -bottom-4 left-1/2 -translate-x-12"
            >
              <Sparkles className="w-6 h-6 text-gold-light drop-shadow-[0_0_10px_rgba(240,230,140,0.8)]" />
            </motion.div>
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute -bottom-4 left-1/2 translate-x-12"
            >
              <Sparkles className="w-5 h-5 text-gold drop-shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MagicalDivider;