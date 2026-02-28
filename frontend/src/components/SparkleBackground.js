import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const SparkleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
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
            value: 80,
            density: {
              enable: true,
              area: 1000
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
              minimumValue: 0.2,
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
            path: {
              enable: true,
              options: {
                size: 5,
                draw: false,
                increment: 0.001
              }
            },
            trail: {
              enable: true,
              length: 5,
              fillColor: 'transparent'
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