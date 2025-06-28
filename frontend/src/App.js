import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from "react-colorful";
import { FiSun, FiMoon, FiDroplet, FiStar } from 'react-icons/fi';
import CatLoading from './components/CatLoading';
import MagicParticles from './components/MagicParticles';
import './App.css';

function App() {
  // State management
  const [colorInput, setColorInput] = useState("#eb3434");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [backgroundGradient, setBackgroundGradient] = useState("");

  // Theme toggle effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Dynamic background effect based on selected color
  useEffect(() => {
    const updateBackgroundGradient = () => {
      const rgb = hexToRgb(colorInput);
      if (rgb) {
        const { r, g, b } = rgb;
        // Create smoother color transitions
        const lighter = `rgb(${Math.min(255, r + 60)}, ${Math.min(255, g + 60)}, ${Math.min(255, b + 60)})`;
        const darker = `rgb(${Math.max(0, r - 60)}, ${Math.max(0, g - 60)}, ${Math.max(0, b - 60)})`;
        const complement = `rgb(${255-r}, ${255-g}, ${255-b})`;
                setBackgroundGradient(`radial-gradient(circle at 20% 30%, ${colorInput}90 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${lighter}70 0%, transparent 50%), radial-gradient(circle at 50% 50%, ${darker}50 0%, transparent 70%), linear-gradient(135deg, ${colorInput}40 0%, ${complement}30 100%)`);
      }
    };

    updateBackgroundGradient();
  }, [colorInput]);

  // Helper function to convert hex to rgb
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Sound effects for better UX
  const playClickSound = () => {
    // Create audio context for web audio API
    if (typeof window !== 'undefined' && window.AudioContext) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  // API call to analyze color
  const handleSubmit = async () => {
    playClickSound(); // Play sound effect
    
    // Haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color: colorInput })
      });

      const data = await response.json();
      // Simulate loading for better UX
      setTimeout(() => {
        setResult(data.result);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setResult("🚫 Lỗi kết nối tới backend. Vui lòng kiểm tra server đang chạy.");
        setIsLoading(false);
      }, 1000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="app-container">
      {/* Animated Background */}
      <motion.div 
        className="animated-bg"
        animate={{
          background: backgroundGradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Magic Particles */}
      <MagicParticles color={colorInput} count={12} />

      {/* Theme Toggle */}
      <motion.button
        className="theme-toggle"
        onClick={() => setIsDarkMode(!isDarkMode)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="sun"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiSun size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiMoon size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Main Content */}
      <motion.div 
        className="main-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Color Picker Section */}
        <motion.div className="color-picker-section" variants={itemVariants}>
                    <motion.div 
            className="hero-title"
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
              y: -2
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="title-text">
              <FiDroplet />
              <span>AI Màu Sắc</span>
            </div>
            <motion.div 
              className="subtitle-mini"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Khám phá ý nghĩa màu sắc
            </motion.div>
          </motion.div>

          <motion.div className="picker-card glass-card" variants={itemVariants}>
            <div className="color-picker-container">
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateZ: 1,
                  boxShadow: `0 20px 40px ${colorInput}40`
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${colorInput}20, transparent)`
                }}
              >
                <HexColorPicker 
                  color={colorInput} 
                  onChange={setColorInput}
                />
              </motion.div>

              <div className="color-info">
                <motion.div
                  className="color-preview"
                  style={{ backgroundColor: colorInput }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 8px 32px rgba(31, 38, 135, 0.2)", 
                      `0 12px 48px ${colorInput}40`, 
                      "0 8px 32px rgba(31, 38, 135, 0.2)"
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                
                <motion.div 
                  className="hex-display"
                  whileHover={{ scale: 1.05 }}
                >
                  Mã HEX: {colorInput.toUpperCase()}
                </motion.div>

                <motion.button
                  className="analyze-button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isLoading ? { 
                    background: [
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: isLoading ? Infinity : 0 }}
                >
                                     {isLoading ? (
                     <motion.div
                       animate={{ rotate: 360 }}
                       transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                       style={{ display: 'inline-block', marginRight: '8px' }}
                     >
                       <FiStar />
                     </motion.div>
                   ) : (
                     <FiStar style={{ marginRight: '8px' }} />
                   )}
                  {isLoading ? 'Đang phân tích...' : 'Phân tích màu sắc'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Results Section */}
        <motion.div className="results-section" variants={itemVariants}>
          <motion.div className="result-card glass-card" variants={itemVariants}>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <CatLoading 
                  key="loading"
                  message="Mèo AI đang suy nghĩ về màu sắc của bạn... 🎨✨"
                />
              ) : result ? (
                <motion.div
                  key="result"
                  className="result-content fade-in"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {result}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="empty-icon"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    🎨
                  </motion.div>
                  <p>Chọn một màu và nhấn "Phân tích" để khám phá ý nghĩa của nó!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;