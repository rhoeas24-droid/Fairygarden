import React from 'react';
import { motion } from 'framer-motion';
import GoldButton from '../GoldButton';

const MagicalDivider = () => {
  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate flowing particle trails like fairy dust
  const generateDustTrails = (count) => {
    return [...Array(count)].map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 200 + Math.random() * 100;
      return {
        id: i,
        path: [
          { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius },
          { x: Math.cos(angle + 1) * (radius * 0.7), y: Math.sin(angle + 1) * (radius * 0.7) },
          { x: Math.cos(angle + 2) * (radius * 1.2), y: Math.sin(angle + 2) * (radius * 1.2) },
          { x: Math.cos(angle + 3) * radius, y: Math.sin(angle + 3) * radius }
        ],
        duration: 4 + Math.random() * 3,
        delay: i * 0.15,
        particleCount: 8 + Math.floor(Math.random() * 5)
      };
    });
  };

  const dustTrails = generateDustTrails(6);

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
          {/* Button with magical sparkles */}
          <div className="relative">
            {/* Animated sparkles around button */}
            {sparkles.map((sparkle) => (
              <motion.div
                key={sparkle.id}
                className="absolute pointer-events-none"
                initial={{
                  x: sparkle.startX,
                  y: sparkle.startY,
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  x: [sparkle.startX, sparkle.endX, sparkle.startX],
                  y: [sparkle.startY, sparkle.endY, sparkle.startY],
                  opacity: [0, 1, 0.8, 1, 0],
                  scale: [0, 1, 1.2, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: sparkle.duration,
                  repeat: Infinity,
                  delay: sparkle.delay,
                  ease: 'easeInOut'
                }}
                style={{
                  left: '50%',
                  top: '50%'
                }}
              >
                {/* Sparkle with trail effect */}
                <div className="relative">
                  <motion.div
                    className="w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: sparkle.color,
                      boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}, 0 0 ${sparkle.size * 4}px ${sparkle.color}`
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 ${sparkle.size * 2}px ${sparkle.color}, 0 0 ${sparkle.size * 4}px ${sparkle.color}`,
                        `0 0 ${sparkle.size * 4}px ${sparkle.color}, 0 0 ${sparkle.size * 8}px ${sparkle.color}`,
                        `0 0 ${sparkle.size * 2}px ${sparkle.color}, 0 0 ${sparkle.size * 4}px ${sparkle.color}`
                      ]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                  {/* Trail */}
                  <motion.div
                    className="absolute top-0 left-0 w-8 h-0.5 rounded-full"
                    style={{
                      background: `linear-gradient(to right, transparent, ${sparkle.color}, transparent)`,
                      filter: 'blur(1px)'
                    }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scaleX: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Larger floating stars */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute pointer-events-none"
                initial={{
                  x: (i % 4 - 1.5) * 150,
                  y: Math.floor(i / 4) * 100 - 50,
                  opacity: 0
                }}
                animate={{
                  x: [(i % 4 - 1.5) * 150, (i % 4 - 1.5) * 150 + (Math.random() - 0.5) * 50],
                  y: [Math.floor(i / 4) * 100 - 50, Math.floor(i / 4) * 100 - 50 + (Math.random() - 0.5) * 50],
                  opacity: [0, 1, 0.7, 1, 0],
                  scale: [0, 1.5, 1, 1.5, 0],
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut'
                }}
                style={{
                  left: '50%',
                  top: '50%'
                }}
              >
                <Star
                  className="text-gold"
                  fill="currentColor"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(201, 168, 76, 0.9))'
                  }}
                  size={6 + (i % 3) * 2}
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
                Explore the Magic
              </GoldButton>
              
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gold/30 blur-2xl -z-10"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 2.5,
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