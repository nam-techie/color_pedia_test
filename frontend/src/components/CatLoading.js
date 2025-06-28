import React from 'react';
import { motion } from 'framer-motion';
import './CatLoading.css';

const CatLoading = ({ message = "AI đang phân tích màu sắc của bạn..." }) => {
  return (
    <motion.div 
      className="cat-loading-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
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
      
      <motion.p 
        className="loading-message"
        animate={{ 
          opacity: [0.7, 1, 0.7],
          y: [0, -5, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {message}
      </motion.p>
      
      {/* Floating hearts */}
      <div className="floating-hearts">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="heart"
            animate={{
              y: [-20, -60, -20],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + i * 10}%`,
            }}
          >
            💖
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CatLoading; 