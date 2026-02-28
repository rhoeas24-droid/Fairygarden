import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  // Generate flowing stars
  const generateStars = () => {
    const stars = [];
    const count = 60; // 60 stars
    
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
      
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        color,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 3,
        opacity: 0.4 + Math.random() * 0.6
      });
    }
    return stars;
  };

  const stars = generateStars();

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
      
      {/* Flowing stars */}
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
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 10, -15, 0],
            opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.7, star.opacity, star.opacity * 0.5],
            scale: [0.8, 1.3, 1, 1.2, 0.8]
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut'
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