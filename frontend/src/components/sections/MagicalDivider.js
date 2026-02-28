import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GoldButton from '../GoldButton';

const MagicalDivider = () => {
  const { t } = useTranslation();
  
  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth flowing particles - elegant gold dust with continuous orbit
  const particles = useMemo(() => {
    const result = [];
    const count = 360;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const baseRadius = 80 + Math.random() * 180;
      
      // Color distribution: 70% gold, 15% blue, 15% magenta
      const colorRand = Math.random();
      let color;
      if (colorRand < 0.15) {
        color = ['#00BFFF', '#1E90FF', '#87CEEB', '#4169E1', '#6495ED'][Math.floor(Math.random() * 5)];
      } else if (colorRand < 0.30) {
        color = ['#FF69B4', '#DB7093', '#FF1493', '#C71585', '#FF00FF'][Math.floor(Math.random() * 5)];
      } else {
        color = ['#f0e68c', '#d4af37', '#c9a84c', '#FFD700', '#DAA520', '#FFDF00'][Math.floor(Math.random() * 6)];
      }
      
      result.push({
        id: i,
        angle,
        radius: baseRadius,
        size: 1 + Math.random() * 3,
        color,
        duration: 18 + Math.random() * 14, // Much slower for smooth flow
        delay: (i / count) * 6,
        opacity: 0.5 + Math.random() * 0.5
      });
    }
    
    return result;
  }, []);

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
          className="flex flex-col items-center justify-center"
        >
          <div className="relative">
            {/* Smooth flowing particles - continuous gentle orbit */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  width: particle.size,
                  height: particle.size,
                  marginLeft: -particle.size / 2,
                  marginTop: -particle.size / 2,
                }}
                animate={{
                  x: [
                    Math.cos(particle.angle) * particle.radius,
                    Math.cos(particle.angle + Math.PI * 0.25) * particle.radius,
                    Math.cos(particle.angle + Math.PI * 0.5) * particle.radius,
                    Math.cos(particle.angle + Math.PI * 0.75) * particle.radius,
                    Math.cos(particle.angle + Math.PI) * particle.radius,
                    Math.cos(particle.angle + Math.PI * 1.25) * particle.radius,
                    Math.cos(particle.angle + Math.PI * 1.5) * particle.radius,
                    Math.cos(particle.angle + Math.PI * 1.75) * particle.radius,
                    Math.cos(particle.angle + Math.PI * 2) * particle.radius,
                  ],
                  y: [
                    Math.sin(particle.angle) * particle.radius * 0.5,
                    Math.sin(particle.angle + Math.PI * 0.25) * particle.radius * 0.5,
                    Math.sin(particle.angle + Math.PI * 0.5) * particle.radius * 0.5,
                    Math.sin(particle.angle + Math.PI * 0.75) * particle.radius * 0.5,
                    Math.sin(particle.angle + Math.PI) * particle.radius * 0.5,
                    Math.sin(particle.angle + Math.PI * 1.25) * particle.radius * 0.5,
                    Math.sin(particle.angle + Math.PI * 1.5) * particle.radius * 0.5,
                    Math.sin(particle.angle + Math.PI * 1.75) * particle.radius * 0.5,
                    Math.sin(particle.angle + Math.PI * 2) * particle.radius * 0.5,
                  ],
                  opacity: [
                    particle.opacity * 0.8,
                    particle.opacity * 0.9,
                    particle.opacity,
                    particle.opacity * 0.95,
                    particle.opacity * 0.85,
                    particle.opacity * 0.9,
                    particle.opacity,
                    particle.opacity * 0.95,
                    particle.opacity * 0.8
                  ],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    backgroundColor: particle.color,
                    boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
                  }}
                />
              </motion.div>
            ))}

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative z-10"
            >
              <GoldButton onClick={scrollToGallery} dataTestId="explore-magic-button">
                {t('hero.button')}
              </GoldButton>
              
              <motion.div
                className="absolute inset-0 rounded-full bg-gold/30 blur-2xl -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MagicalDivider;
