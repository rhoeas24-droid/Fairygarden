import React, { useEffect, useState, useCallback } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const SparkleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = useCallback((container) => {
    console.log('Particles loaded', container);
  }, []);

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: true,
          zIndex: 0
        },
        background: {
          color: {
            value: 'transparent'
          }
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              area: 800
            }
          },
          color: {
            value: ['#c9a84c', '#f0e68c', '#d4af37', '#FFD700']
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: { min: 0.3, max: 0.8 },
            animation: {
              enable: true,
              speed: 0.5,
              startValue: 'random',
              sync: false
            }
          },
          size: {
            value: { min: 1, max: 3 }
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: 'none',
            random: false,
            straight: false,
            outModes: {
              default: 'out'
            },
            warp: true
          }
        },
        interactivity: {
          detectsOn: 'canvas',
          events: {
            onHover: {
              enable: true,
              mode: 'bubble'
            },
            resize: true
          },
          modes: {
            bubble: {
              distance: 150,
              size: 6,
              duration: 2,
              opacity: 1
            }
          }
        },
        detectRetina: true
      }}
    />
  );
};

export default SparkleBackground;
