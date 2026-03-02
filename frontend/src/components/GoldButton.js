import React from 'react';
import { motion } from 'framer-motion';

const GoldButton = ({ children, onClick, className = '', dataTestId, disabled, ...props }) => {
  return (
    <motion.button
      data-testid={dataTestId}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-8 py-4 font-bold text-base tracking-wider uppercase rounded-full
        bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
        text-[#3e2b08] overflow-hidden
        shadow-[inset_2px_2px_8px_rgba(255,255,255,0.5),inset_-2px_-2px_8px_rgba(0,0,0,0.5),0_6px_16px_rgba(0,0,0,0.4)]
        hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),inset_-2px_-2px_8px_rgba(0,0,0,0.6),0_8px_20px_rgba(201,168,76,0.4)]
        active:translate-y-1 active:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.3)]
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}`}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      {...props}
    >
      <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"
        initial={{ y: '100%' }}
        whileHover={{ y: '-100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
};

export default GoldButton;