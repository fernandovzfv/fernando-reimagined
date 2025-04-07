
import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadPolygonPath } from "tsparticles-path-polygon";
import { useTheme } from './ThemeProvider';

const ParticleBackground = () => {
  const { theme } = useTheme();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
    await loadPolygonPath(engine);
  }, []);

  // Define color variables based on theme
  const particleColor = theme === 'dark' ? "#0071e3" : "#0071e3";
  const linkColor = theme === 'dark' ? "#0071e3" : "#0071e3";
  const particleOpacity = theme === 'dark' ? 0.5 : 0.3;
  const linkOpacity = theme === 'dark' ? 0.3 : 0.2;

  return (
    <div 
      className="particle-container fixed inset-0 -z-10"
      data-dark-mode-compatible="true"
    >
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
              value: particleColor,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: particleOpacity,
            },
            shape: {
              type: "path",
              options: {
                path: {
                  // Hexagon path
                  data: "M41.9,29.5L25,37.9L8.1,29.5v-17L25,4.1l16.9,8.4V29.5z",
                  // Scale the shape to adjust its size
                  scale: 1,
                },
              },
            },
            size: {
              value: { min: 5, max: 15 },
            },
            links: {
              color: linkColor,
              distance: 150,
              enable: true,
              opacity: linkOpacity,
              width: 1,
            },
            collisions: {
              enable: false,
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
