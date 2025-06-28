import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const MagicParticles = ({ color = "#667eea", count = 15 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 8 + 4,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 2,
    }));
  }, [count]);

  const particleEmojis = ['✨', '🌟', '💫', '⭐', '🔮', '💎', '🌈', '🎨'];

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
        zIndex: 0
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
            filter: `hue-rotate(${Math.random() * 360}deg)`,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            rotate: 0 
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1.2, 0],
            rotate: [0, 180, 360],
            x: [0, Math.random() * 200 - 100, Math.random() * 300 - 150],
            y: [0, Math.random() * 200 - 100, Math.random() * 300 - 150],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {particleEmojis[Math.floor(Math.random() * particleEmojis.length)]}
        </motion.div>
      ))}
      
      {/* Floating orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color}80, transparent)`,
            boxShadow: `0 0 ${Math.random() * 20 + 10}px ${color}60`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default MagicParticles; 