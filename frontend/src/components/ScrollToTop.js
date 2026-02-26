import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Sparkles } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 group"
          data-testid="scroll-to-top-button"
          aria-label="Scroll to top"
        >
          {/* Magical glow effect */}
          <div className="absolute inset-0 rounded-full bg-gold/30 blur-xl group-hover:bg-gold/50 transition-all duration-300" />
          
          {/* Sparkle particles */}
          <motion.div
            className="absolute -top-1 -left-1"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-3 h-3 text-gold" />
          </motion.div>
          <motion.div
            className="absolute -top-2 right-0"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            <Sparkles className="w-2 h-2 text-gold-light" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 -right-1"
            animate={{
              opacity: [0.4, 0.9, 0.4],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
          >
            <Sparkles className="w-2.5 h-2.5 text-gold" />
          </motion.div>
          
          {/* Main button */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
            shadow-[inset_1px_1px_4px_rgba(255,255,255,0.5),inset_-1px_-1px_4px_rgba(0,0,0,0.3),0_4px_15px_rgba(201,168,76,0.4)]
            flex items-center justify-center
            group-hover:shadow-[inset_1px_1px_4px_rgba(255,255,255,0.6),inset_-1px_-1px_4px_rgba(0,0,0,0.4),0_6px_20px_rgba(201,168,76,0.6)]
            transition-all duration-300 overflow-hidden"
          >
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Animated arrow */}
            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronUp className="w-7 h-7 text-forest-dark relative z-10" strokeWidth={3} />
            </motion.div>
          </div>
          
          {/* Floating ring animation */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-gold/40"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
