import React from 'react';
import { motion } from 'framer-motion';
import './CatLoading.css';

const CatLoading = ({ message = "AI đang phân tích màu sắc của bạn..." }) => {
  return (
    <motion.div 
      className="cat-loading-container"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="loading-cat">
          <div className="body"></div>
          <div className="head">
            <div className="face"></div>
          </div>
          <div className="foot">
            <div className="tummy-end"></div>
            <div className="bottom"></div>
            <div className="legs left"></div>
            <div className="legs right"></div>
          </div>
          <div className="hands left"></div>
          <div className="hands right"></div>
        </div>
      </motion.div>
      
      <motion.p 
        className="loading-message"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.span
          animate={{ 
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {message}
        </motion.span>
      </motion.p>
      
      {/* Enhanced floating hearts */}
      <div className="floating-hearts">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="heart"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              y: [-20, -80, -20],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut"
            }}
            style={{
              left: `${15 + i * 10}%`,
            }}
          >
            {['💖', '✨', '🌟', '💫', '🎨', '🦄', '🌈', '💎'][i]}
          </motion.div>
        ))}
      </div>

      {/* Additional sparkle effects */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          fontSize: '1.5rem',
        }}
        animate={{
          scale: [0, 1, 0],
          rotate: [0, 180, 360],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1,
        }}
      >
        ✦
      </motion.div>

      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          right: '25%',
          fontSize: '1.2rem',
        }}
        animate={{
          scale: [0, 1, 0],
          rotate: [360, 180, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 2,
        }}
      >
        ✧
      </motion.div>
    </motion.div>
  );
};

export default CatLoading;