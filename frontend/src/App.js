import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from "react-colorful";
import { 
  FiSun, 
  FiMoon, 
  FiDroplet, 
  FiStar, 
  FiSparkles,
  FiEye,
  FiHeart,
  FiZap
} from 'react-icons/fi';
import CatLoading from './components/CatLoading';
import MagicParticles from './components/MagicParticles';
import FloatingElements from './components/FloatingElements';
import './App.css';

function App() {
  // State management
  const [colorInput, setColorInput] = useState("#6366f1");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme toggle effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Sound effects for better UX
  const playClickSound = () => {
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
    playClickSound();
    
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
      setTimeout(() => {
        setResult(data.result);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setResult("🚫 Lỗi kết nối tới backend. Vui lòng kiểm tra server đang chạy.");
        setIsLoading(false);
      }, 1500);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="app-container">
      {/* Floating Background Elements */}
      <FloatingElements />
      
      {/* Magic Particles */}
      <MagicParticles color={colorInput} count={15} />

      {/* Theme Toggle */}
      <motion.button
        className="theme-toggle"
        onClick={() => setIsDarkMode(!isDarkMode)}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
              <FiSun size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiMoon size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Header */}
      <motion.header 
        className="app-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="hero-section">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                background: "linear-gradient(270deg, #ffffff, #f0f9ff, #e0f2fe, #ffffff)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              AI Màu Sắc Thông Minh
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Khám phá ý nghĩa sâu sắc và tính cách ẩn giấu trong từng màu sắc với công nghệ AI tiên tiến
          </motion.p>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        className="main-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Color Picker Section */}
        <motion.section className="color-picker-section" variants={itemVariants}>
          <motion.div 
            className="picker-card hover-lift"
            whileHover={{ 
              y: -8,
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25), 0 0 40px rgba(255, 255, 255, 0.1)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="color-picker-container">
              <motion.div
                className="picker-wrapper"
                whileHover={{ 
                  scale: 1.02,
                  rotateZ: 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <HexColorPicker 
                  color={colorInput} 
                  onChange={setColorInput}
                />
              </motion.div>

              <div className="color-info">
                <motion.div
                  className="color-preview hover-glow"
                  style={{ backgroundColor: colorInput }}
                  animate={{ 
                    boxShadow: [
                      "0 8px 32px rgba(0, 0, 0, 0.1)", 
                      `0 12px 48px ${colorInput}40`, 
                      "0 8px 32px rgba(0, 0, 0, 0.1)"
                    ]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  whileHover={{ scale: 1.05 }}
                />
                
                <motion.div 
                  className="hex-display"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {colorInput.toUpperCase()}
                </motion.div>

                <motion.button
                  className="analyze-button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  animate={isLoading ? { 
                    background: [
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: isLoading ? Infinity : 0 }}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, rotate: 0 }}
                        animate={{ opacity: 1, rotate: 360 }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                          opacity: { duration: 0.2 }
                        }}
                        style={{ display: 'inline-block' }}
                      >
                        <FiSparkles />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: 'inline-block' }}
                      >
                        <FiZap />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span style={{ marginLeft: '8px' }}>
                    {isLoading ? 'Đang phân tích...' : 'Phân tích màu sắc'}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Results Section */}
        <motion.section className="results-section" variants={itemVariants}>
          <motion.div 
            className="result-card hover-lift"
            whileHover={{ 
              y: -4,
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25), 0 0 40px rgba(255, 255, 255, 0.1)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <CatLoading 
                  key="loading"
                  message="AI đang khám phá bí mật của màu sắc bạn chọn... ✨"
                />
              ) : result ? (
                <motion.div
                  key="result"
                  className="result-content fade-in"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {result}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="empty-state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="empty-icon"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    🎨
                  </motion.div>
                  <motion.div
                    className="empty-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p>Chọn một màu yêu thích và khám phá những điều thú vị về tính cách của bạn!</p>
                    <motion.div
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '12px', 
                        marginTop: '16px',
                        fontSize: '1.5rem'
                      }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FiEye />
                      <FiHeart />
                      <FiStar />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.section>
      </motion.main>
    </div>
  );
}

export default App;