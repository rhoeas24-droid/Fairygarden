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
            value: 50,
            density: {
              enable: true,
              area: 800
            }
          },
          color: {
            value: ['#c9a84c', '#f0e68c', '#d4af37']
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: { min: 0.1, max: 0.8 },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false
            }
          },
          size: {
            value: { min: 1, max: 4 }
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
              default: 'out'
            }
          }
        },
        interactivity: {
          detectsOn: 'canvas',
          events: {
            onHover: {
              enable: true,
              mode: 'grab'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.3,
                color: '#c9a84c'
              }
            }
          }
        },
        detectRetina: true
      }}
    />
  );
};

export default SparkleBackground;