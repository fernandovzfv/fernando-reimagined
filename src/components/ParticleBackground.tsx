
import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { useTheme } from './ThemeProvider';

const ParticleBackground = () => {
  const { theme } = useTheme();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="particle-container fixed inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: false,
          },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#0071e3", // Same blue color for both themes
            },
            links: {
              color: "#0071e3", // Same blue color for both themes
              distance: 150,
              enable: true,
              opacity: 0.15, // More transparent links
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 40,
            },
            opacity: {
              value: 0.2, // More transparent particles
            },
            shape: {
              type: "polygon",
              polygon: {
                sides: 6, // hexagon
              },
            },
            size: {
              value: { min: 3, max: 8 }, // Smaller hexagons
            },
          },
          detectRetina: true,
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default ParticleBackground;
