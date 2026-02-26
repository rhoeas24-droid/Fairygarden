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

  // Természetes arany színárnyalatok
  const goldShades = [
    '#f0e68c', // light gold
    '#d4af37', // classic gold
    '#c9a84c', // medium gold
    '#FFD700', // bright gold
    '#DAA520', // goldenrod
    '#FFA500', // orange gold
    '#FFDF00', // golden yellow
    '#E6BE8A'  // pale gold
  ];

  // Organikus fairy dust nyalábok generálása
  const generateOrganicDust = () => {
    const particles = [];
    const streamCount = 8; // Több nyaláb
    
    for (let stream = 0; stream < streamCount; stream++) {
      const baseAngle = (stream / streamCount) * Math.PI * 2;
      const particlesInStream = 40 + Math.floor(Math.random() * 40); // 40-80 részecske nyalábonként
      
      for (let i = 0; i < particlesInStream; i++) {
        const progress = i / particlesInStream;
        const spreadAngle = baseAngle + (Math.random() - 0.5) * 0.8; // Természetes szórás
        const radius = 120 + Math.random() * 200;
        
        // Organikus, hullámos út
        const wavyPath = [];
        for (let point = 0; point < 5; point++) {
          const pointProgress = point / 4;
          const distance = radius * (0.6 + pointProgress * 0.8);
          const angle = spreadAngle + Math.sin(pointProgress * Math.PI * 2) * 0.3;
          
          wavyPath.push({
            x: Math.cos(angle) * distance + (Math.random() - 0.5) * 40,
            y: Math.sin(angle) * distance + (Math.random() - 0.5) * 40
          });
        }
        
        particles.push({
          id: `${stream}-${i}`,
          path: wavyPath,
          size: 0.5 + Math.random() * 2.5, // Változatos méretek
          color: goldShades[Math.floor(Math.random() * goldShades.length)],
          duration: 3 + Math.random() * 4,
          delay: progress * 2.5 + Math.random() * 1,
          opacity: 0.3 + Math.random() * 0.7
        });
      }
    }
    
    return particles;
  };

  const fairyDust = generateOrganicDust();

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
            {/* Organikus fairy dust részecskék */}
            {fairyDust.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  width: particle.size,
                  height: particle.size
                }}
                initial={{
                  x: particle.path[0].x,
                  y: particle.path[0].y,
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  x: particle.path.map(p => p.x),
                  y: particle.path.map(p => p.y),
                  opacity: [0, particle.opacity, particle.opacity * 0.8, particle.opacity, 0],
                  scale: [0, 1, 1.2, 0.9, 0]
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
                    boxShadow: `0 0 ${particle.size * 3}px ${particle.color}, 0 0 ${particle.size * 6}px ${particle.color}`,
                    filter: 'blur(0.5px)'
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
              {/* Magenta tündér - bal oldal */}
              <motion.div
                className="absolute -left-12 top-1/2 -translate-y-1/2 pointer-events-none"
                animate={{
                  y: [0, -8, 0],
                  rotate: [-5, 5, -5]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <Sparkles 
                    className="w-8 h-8 text-[#FF1493]" 
                    fill="#FF1493"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(255, 20, 147, 0.8)) drop-shadow(0 0 4px rgba(255, 20, 147, 0.6))'
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Kék tündér - jobb oldal */}
              <motion.div
                className="absolute -right-12 top-1/2 -translate-y-1/2 pointer-events-none"
                animate={{
                  y: [0, -10, 0],
                  rotate: [5, -5, 5]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.4
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.2
                  }}
                >
                  <Sparkles 
                    className="w-8 h-8 text-[#00BFFF]" 
                    fill="#00BFFF"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(0, 191, 255, 0.8)) drop-shadow(0 0 4px rgba(0, 191, 255, 0.6))'
                    }}
                  />
                </motion.div>
              </motion.div>

              <GoldButton onClick={scrollToGallery} dataTestId="explore-magic-button">
                Explore the Magic
              </GoldButton>
              
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
