import React from 'react';
import { motion } from 'framer-motion';
import './ColorHistory.css';

const ColorHistory = ({ colors, onColorSelect, currentColor }) => {
  return (
    <motion.div 
      className="color-history"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h4 className="history-title">Lịch sử màu sắc</h4>
      <div className="history-grid">
        {colors.map((color, index) => (
          <motion.button
            key={`${color}-${index}`}
            className={`history-color ${color === currentColor ? 'active' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05,
              type: "spring",
              stiffness: 300
            }}
            title={color}
          >
            {color === currentColor && (
              <motion.div
                className="active-indicator"
                layoutId="activeColor"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ColorHistory;