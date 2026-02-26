import React from 'react';
import { motion } from 'framer-motion';

const FairySilhouette = ({ color = '#FF1493', className = '' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tündér test és fej */}
      <g fill={color} style={{ filter: `drop-shadow(0 0 8px ${color})` }}>
        {/* Fej és haj */}
        <ellipse cx="100" cy="50" rx="18" ry="20" />
        <path d="M85 45 Q80 35, 85 30 Q88 25, 92 28 Q95 25, 98 30 Q102 35, 100 40 Z" />
        <path d="M115 45 Q120 35, 115 30 Q112 25, 108 28 Q105 25, 102 30 Q98 35, 100 40 Z" />
        
        {/* Test */}
        <ellipse cx="100" cy="85" rx="15" ry="25" />
        
        {/* Ruha */}
        <path d="M85 95 L100 140 L115 95 Q110 100, 100 105 Q90 100, 85 95 Z" />
        <path d="M100 140 L95 145 L90 155 M100 140 L105 145 L110 155" strokeWidth="3" stroke={color} fill="none" />
        
        {/* Karok */}
        <path d="M88 75 L75 85 L70 90" strokeWidth="4" stroke={color} strokeLinecap="round" />
        <path d="M112 75 L125 85 L130 90" strokeWidth="4" stroke={color} strokeLinecap="round" />
        
        {/* Lábak */}
        <path d="M95 140 L92 160 L90 170" strokeWidth="5" stroke={color} strokeLinecap="round" />
        <path d="M105 140 L108 160 L110 170" strokeWidth="5" stroke={color} strokeLinecap="round" />
      </g>
      
      {/* Animált szárnyak */}
      <g>
        {/* Bal szárny */}
        <motion.g
          style={{ originX: '100px', originY: '80px' }}
          animate={{
            rotateY: [0, -25, 0],
            scaleX: [1, 0.8, 1]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <path
            d="M100 70 Q60 60, 45 75 Q35 85, 45 95 Q55 100, 70 95 Q85 88, 100 85 Z"
            fill={color}
            opacity="0.9"
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
          <path
            d="M95 85 Q70 80, 60 90 Q55 95, 60 100 Q70 102, 80 98 Q90 92, 95 88 Z"
            fill={color}
            opacity="0.7"
          />
          {/* Szárny erek */}
          <path
            d="M100 75 L50 80 M100 80 L55 90 M100 85 L65 95"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
          />
        </motion.g>
        
        {/* Jobb szárny */}
        <motion.g
          style={{ originX: '100px', originY: '80px' }}
          animate={{
            rotateY: [0, 25, 0],
            scaleX: [1, 0.8, 1]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.1
          }}
        >
          <path
            d="M100 70 Q140 60, 155 75 Q165 85, 155 95 Q145 100, 130 95 Q115 88, 100 85 Z"
            fill={color}
            opacity="0.9"
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
          <path
            d="M105 85 Q130 80, 140 90 Q145 95, 140 100 Q130 102, 120 98 Q110 92, 105 88 Z"
            fill={color}
            opacity="0.7"
          />
          {/* Szárny erek */}
          <path
            d="M100 75 L150 80 M100 80 L145 90 M100 85 L135 95"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
          />
        </motion.g>
      </g>
    </svg>
  );
};

export default FairySilhouette;