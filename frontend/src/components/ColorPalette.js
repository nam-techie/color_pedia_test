import React from 'react';
import { motion } from 'framer-motion';
import './ColorPalette.css';

const ColorPalette = ({ baseColor, onColorSelect }) => {
  // Generate complementary colors
  const generatePalette = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    const palette = [];
    
    // Lighter variations
    for (let i = 1; i <= 2; i++) {
      const factor = 0.3 * i;
      const newR = Math.min(255, Math.round(r + (255 - r) * factor));
      const newG = Math.min(255, Math.round(g + (255 - g) * factor));
      const newB = Math.min(255, Math.round(b + (255 - b) * factor));
      palette.push(`#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`);
    }
    
    // Original color
    palette.push(hex);
    
    // Darker variations
    for (let i = 1; i <= 2; i++) {
      const factor = 0.3 * i;
      const newR = Math.round(r * (1 - factor));
      const newG = Math.round(g * (1 - factor));
      const newB = Math.round(b * (1 - factor));
      palette.push(`#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`);
    }
    
    return palette;
  };

  const palette = generatePalette(baseColor);

  return (
    <motion.div 
      className="color-palette"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="palette-title">Bảng màu gợi ý</h4>
      <div className="palette-grid">
        {palette.map((color, index) => (
          <motion.button
            key={`${color}-${index}`}
            className={`palette-color ${color === baseColor ? 'current' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300
            }}
            title={color}
          >
            {color === baseColor && (
              <motion.div
                className="current-indicator"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ColorPalette;