import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  const elements = [
    { icon: '✨', size: '2rem', delay: 0 },
    { icon: '🌟', size: '1.5rem', delay: 1 },
    { icon: '💫', size: '1.8rem', delay: 2 },
    { icon: '⭐', size: '1.3rem', delay: 3 },
    { icon: '🔮', size: '1.6rem', delay: 4 },
    { icon: '💎', size: '1.4rem', delay: 5 },
  ];

  return (
    <div className="floating-elements">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="floating-element"
          style={{
            position: 'absolute',
            fontSize: element.size,
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            zIndex: 1,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;