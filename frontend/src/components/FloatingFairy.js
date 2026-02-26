import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const FloatingFairy = ({ delay = 0, duration = 8 }) => {
  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      initial={{ x: '-10%', y: '50vh', opacity: 0 }}
      animate={{
        x: ['0%', '100vw'],
        y: ['50vh', '30vh', '70vh', '40vh', '60vh'],
        opacity: [0, 1, 1, 1, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 10 + 10,
        ease: 'easeInOut'
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <Sparkles className="w-6 h-6 text-gold drop-shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
      </motion.div>
    </motion.div>
  );
};

export default FloatingFairy;