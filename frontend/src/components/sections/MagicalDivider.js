import React from 'react';
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

  // Smooth flowing particles - elegant gold dust
  const generateFlowingParticles = () => {
    const particles = [];
    const count = 60;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const baseRadius = 80 + Math.random() * 150;
      
      // Color distribution: 80% gold, 10% blue, 10% magenta
      const colorRand = Math.random();
      let color;
      if (colorRand < 0.1) {
        color = ['#00BFFF', '#1E90FF', '#87CEEB'][Math.floor(Math.random() * 3)];
      } else if (colorRand < 0.2) {
        color = ['#FF69B4', '#DB7093', '#FF1493'][Math.floor(Math.random() * 3)];
      } else {
        color = ['#f0e68c', '#d4af37', '#c9a84c', '#FFD700', '#DAA520'][Math.floor(Math.random() * 5)];
      }
      
      particles.push({
        id: i,
        angle,
        radius: baseRadius,
        size: 1 + Math.random() * 2.5,
        color,
        duration: 8 + Math.random() * 6,
        delay: (i / count) * 4,
        opacity: 0.4 + Math.random() * 0.5
      });
    }
    
    return particles;
  };

  const particles = generateFlowingParticles();

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
            {/* Smooth flowing particles in circular orbit */}
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
                    Math.cos(particle.angle + Math.PI * 0.5) * particle.radius * 1.1,
                    Math.cos(particle.angle + Math.PI) * particle.radius,
                    Math.cos(particle.angle + Math.PI * 1.5) * particle.radius * 0.9,
                    Math.cos(particle.angle + Math.PI * 2) * particle.radius,
                  ],
                  y: [
                    Math.sin(particle.angle) * particle.radius * 0.6,
                    Math.sin(particle.angle + Math.PI * 0.5) * particle.radius * 0.7,
                    Math.sin(particle.angle + Math.PI) * particle.radius * 0.6,
                    Math.sin(particle.angle + Math.PI * 1.5) * particle.radius * 0.5,
                    Math.sin(particle.angle + Math.PI * 2) * particle.radius * 0.6,
                  ],
                  opacity: [
                    particle.opacity * 0.5,
                    particle.opacity,
                    particle.opacity * 0.8,
                    particle.opacity,
                    particle.opacity * 0.5
                  ],
                  scale: [0.8, 1.2, 1, 1.1, 0.8]
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'easeInOut'
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
