import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  // Generate flowing stars - fewer on mobile for performance
  const stars = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const result = [];
    const count = isMobile ? 20 : 60;
    
    for (let i = 0; i < count; i++) {
      const colorRand = Math.random();
      let color;
      if (colorRand < 0.15) {
        color = ['#00BFFF', '#1E90FF', '#87CEEB', '#4169E1'][Math.floor(Math.random() * 4)];
      } else if (colorRand < 0.30) {
        color = ['#FF69B4', '#DB7093', '#FF1493', '#C71585'][Math.floor(Math.random() * 4)];
      } else {
        color = ['#f0e68c', '#d4af37', '#c9a84c', '#FFD700', '#DAA520'][Math.floor(Math.random() * 5)];
      }
      
      // Smooth circular/elliptical path parameters
      const radiusX = 8 + Math.random() * 15;
      const radiusY = 6 + Math.random() * 12;
      const phase = Math.random() * Math.PI * 2;
      
      result.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        color,
        duration: 12 + Math.random() * 10, // Slower, smoother
        delay: Math.random() * 8,
        opacity: 0.5 + Math.random() * 0.5,
        radiusX,
        radiusY,
        phase
      });
    }
    return result;
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/HEADER_ENH.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-forest/30" />
      
      {/* Smooth flowing stars - gentle elliptical drift */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute pointer-events-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            x: [
              Math.cos(star.phase) * star.radiusX,
              Math.cos(star.phase + Math.PI * 0.5) * star.radiusX,
              Math.cos(star.phase + Math.PI) * star.radiusX,
              Math.cos(star.phase + Math.PI * 1.5) * star.radiusX,
              Math.cos(star.phase + Math.PI * 2) * star.radiusX,
            ],
            y: [
              Math.sin(star.phase) * star.radiusY,
              Math.sin(star.phase + Math.PI * 0.5) * star.radiusY,
              Math.sin(star.phase + Math.PI) * star.radiusY,
              Math.sin(star.phase + Math.PI * 1.5) * star.radiusY,
              Math.sin(star.phase + Math.PI * 2) * star.radiusY,
            ],
            opacity: [
              star.opacity * 0.7,
              star.opacity,
              star.opacity * 0.85,
              star.opacity,
              star.opacity * 0.7
            ],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
            }}
          />
        </motion.div>
      ))}
    </section>
  );
};

export default Hero;