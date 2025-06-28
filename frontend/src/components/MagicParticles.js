import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const MagicParticles = ({ color = "#6366f1", count = 20 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 3,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 3,
    }));
  }, [count]);

  const particleEmojis = ['✨', '🌟', '💫', '⭐', '🔮', '💎', '🌈', '🎨', '💖', '🦄'];

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 2
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            fontSize: `${particle.size}px`,
            filter: `hue-rotate(${Math.random() * 360}deg) brightness(1.2)`,
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            rotate: 0 
          }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            scale: [0, 1, 1.3, 0],
            rotate: [0, 180, 360],
            x: [0, Math.random() * 300 - 150, Math.random() * 400 - 200],
            y: [0, Math.random() * 300 - 150, Math.random() * 400 - 200],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.2, 0.8, 1]
          }}
        >
          {particleEmojis[Math.floor(Math.random() * particleEmojis.length)]}
        </motion.div>
      ))}
      
      {/* Floating orbs with color influence */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color}60, transparent)`,
            boxShadow: `0 0 ${Math.random() * 30 + 15}px ${color}40`,
            filter: 'blur(1px)',
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, Math.random() * 150 - 75, 0],
            y: [0, Math.random() * 200 - 100, Math.random() * 150 - 75, 0],
            opacity: [0.2, 0.8, 0.6, 0.2],
            scale: [0.5, 1.2, 0.8, 0.5],
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Sparkle trail effect */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.8)',
            textShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut",
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
};

export default MagicParticles;