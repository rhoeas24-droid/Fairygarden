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
          {/* Button with fairy dust trails */}
          <div className="relative">
            {/* Flowing glitter particle trails */}
            {dustTrails.map((trail) => (
              <div key={trail.id}>
                {[...Array(trail.particleCount)].map((_, particleIdx) => (
                  <motion.div
                    key={`${trail.id}-${particleIdx}`}
                    className="absolute pointer-events-none"
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                    initial={{
                      x: trail.path[0].x,
                      y: trail.path[0].y,
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{
                      x: trail.path.map(p => p.x),
                      y: trail.path.map(p => p.y),
                      opacity: [0, 1, 1, 0.6, 0],
                      scale: [0, 1, 1.5, 1, 0]
                    }}
                    transition={{
                      duration: trail.duration,
                      delay: trail.delay + particleIdx * 0.08,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    {/* Individual glitter particle with glow */}
                    <div
                      className="w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: particleIdx % 3 === 0 ? '#f0e68c' : particleIdx % 3 === 1 ? '#c9a84c' : '#d4af37',
                        boxShadow: `0 0 ${4 + particleIdx % 3}px ${particleIdx % 3 === 0 ? '#f0e68c' : particleIdx % 3 === 1 ? '#c9a84c' : '#d4af37'},
                                   0 0 ${8 + particleIdx % 3 * 2}px ${particleIdx % 3 === 0 ? '#f0e68c' : particleIdx % 3 === 1 ? '#c9a84c' : '#d4af37'}`
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            ))}

            {/* Additional random floating sparkles */}
            {[...Array(30)].map((_, i) => {
              const randomAngle = Math.random() * Math.PI * 2;
              const randomRadius = 150 + Math.random() * 150;
              const randomX = Math.cos(randomAngle) * randomRadius;
              const randomY = Math.sin(randomAngle) * randomRadius;
              
              return (
                <motion.div
                  key={`float-${i}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  initial={{
                    x: randomX,
                    y: randomY,
                    opacity: 0
                  }}
                  animate={{
                    x: [randomX, randomX + (Math.random() - 0.5) * 100],
                    y: [randomY, randomY + (Math.random() - 0.5) * 100],
                    opacity: [0, 0.8, 0.4, 0.8, 0],
                    scale: [0, 1, 1.2, 0.8, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <div
                    className="w-0.5 h-0.5 rounded-full"
                    style={{
                      backgroundColor: i % 2 === 0 ? '#f0e68c' : '#c9a84c',
                      boxShadow: `0 0 3px ${i % 2 === 0 ? '#f0e68c' : '#c9a84c'}, 0 0 6px ${i % 2 === 0 ? '#f0e68c' : '#c9a84c'}`
                    }}
                  />
                </motion.div>
              );
            })}

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