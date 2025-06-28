import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from "react-colorful";
import { 
  FiSun, 
  FiMoon, 
  FiDroplet, 
  FiStar, 
  FiEye,
  FiHeart,
  FiZap,
  FiCopy,
  FiShare2,
  FiDownload,
  FiRefreshCw
} from 'react-icons/fi';
import CatLoading from './components/CatLoading';
import ColorHistory from './components/ColorHistory';
import ColorPalette from './components/ColorPalette';
import './App.css';

function App() {
  // State management
  const [colorInput, setColorInput] = useState("#6366f1");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [colorHistory, setColorHistory] = useState([]);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const canvasRef = useRef(null);

  // Theme toggle effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate random color
  const generateRandomColor = () => {
    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
      "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
      "#F8C471", "#82E0AA", "#F1948A", "#85C1E9", "#D7BDE2"
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColorInput(randomColor);
  };

  // Copy color to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(colorInput);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // API call to analyze color
  const handleSubmit = async () => {
    setIsLoading(true);
    setIsAnalyzing(true);
    
    // Add to history
    if (!colorHistory.includes(colorInput)) {
      setColorHistory(prev => [colorInput, ...prev.slice(0, 9)]);
    }

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
        setIsAnalyzing(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setResult("🚫 Lỗi kết nối tới backend. Vui lòng kiểm tra server đang chạy.");
        setIsLoading(false);
        setIsAnalyzing(false);
      }, 1500);
    }
  };

  // Generate color palette based on current color
  const generatePalette = (baseColor) => {
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const palette = [];
    for (let i = 0; i < 5; i++) {
      const factor = 0.2 + (i * 0.2);
      const newR = Math.round(r * factor + (255 * (1 - factor)));
      const newG = Math.round(g * factor + (255 * (1 - factor)));
      const newB = Math.round(b * factor + (255 * (1 - factor)));
      palette.push(`#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`);
    }
    return palette;
  };

  return (
    <div className="app-container">
      {/* Interactive cursor effect */}
      <div 
        className="cursor-glow"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          background: `radial-gradient(circle, ${colorInput}40 0%, transparent 70%)`
        }}
      />

      {/* Copy toast notification */}
      <AnimatePresence>
        {showCopyToast && (
          <motion.div
            className="copy-toast"
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <FiCopy size={16} />
            Đã sao chép màu!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Toggle */}
      <motion.button
        className="theme-toggle"
        onClick={() => setIsDarkMode(!isDarkMode)}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="sun"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
            >
              <FiSun size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
            >
              <FiMoon size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Header */}
      <motion.header 
        className="app-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-section">
          <motion.h1 
            className="hero-title"
            style={{
              background: `linear-gradient(135deg, var(--text-primary) 0%, ${colorInput} 50%, var(--secondary) 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            AI Màu Sắc Thông Minh
          </motion.h1>
          <p className="hero-subtitle">
            Khám phá ý nghĩa sâu sắc và tính cách ẩn giấu trong từng màu sắc với công nghệ AI tiên tiến
          </p>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="main-content">
        {/* Color Picker Section */}
        <motion.section 
          className="color-picker-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="picker-card"
            style={{
              boxShadow: `0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px ${colorInput}20`
            }}
            whileHover={{ y: -8 }}
          >
            <div className="color-picker-container">
              <div className="picker-wrapper">
                <HexColorPicker 
                  color={colorInput} 
                  onChange={setColorInput}
                />
              </div>

              <div className="color-info">
                <motion.div
                  className="color-preview"
                  style={{ backgroundColor: colorInput }}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  animate={{
                    boxShadow: [
                      `0 8px 32px ${colorInput}30`,
                      `0 12px 48px ${colorInput}50`,
                      `0 8px 32px ${colorInput}30`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <div className="color-controls">
                  <motion.div 
                    className="hex-display"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    style={{ cursor: 'pointer' }}
                  >
                    {colorInput.toUpperCase()}
                    <FiCopy size={14} style={{ marginLeft: '8px', opacity: 0.7 }} />
                  </motion.div>

                  <div className="action-buttons">
                    <motion.button
                      className="icon-button"
                      onClick={generateRandomColor}
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      whileTap={{ scale: 0.9 }}
                      title="Màu ngẫu nhiên"
                    >
                      <FiRefreshCw size={16} />
                    </motion.button>
                    
                    <motion.button
                      className="icon-button"
                      onClick={copyToClipboard}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Sao chép"
                    >
                      <FiCopy size={16} />
                    </motion.button>
                  </div>
                </div>

                <motion.button
                  className="analyze-button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: isAnalyzing 
                      ? `linear-gradient(135deg, ${colorInput} 0%, var(--secondary) 100%)`
                      : `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)`
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, rotate: 0 }}
                        animate={{ opacity: 1, rotate: 360 }}
                        exit={{ opacity: 0 }}
                        transition={{ rotate: { duration: 1, repeat: Infinity, ease: "linear" } }}
                      >
                        <FiDroplet />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <FiZap />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span>{isLoading ? 'Đang phân tích...' : 'Phân tích màu sắc'}</span>
                </motion.button>
              </div>
            </div>

            {/* Color Palette */}
            <ColorPalette 
              baseColor={colorInput} 
              onColorSelect={setColorInput}
            />

            {/* Color History */}
            {colorHistory.length > 0 && (
              <ColorHistory 
                colors={colorHistory}
                onColorSelect={setColorInput}
                currentColor={colorInput}
              />
            )}
          </motion.div>
        </motion.section>

        {/* Results Section */}
        <motion.section 
          className="results-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div 
            className="result-card"
            style={{
              borderColor: `${colorInput}30`
            }}
            whileHover={{ y: -4 }}
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
                  className="result-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="result-header">
                    <h3>Kết quả phân tích</h3>
                    <div className="result-actions">
                      <motion.button
                        className="icon-button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Chia sẻ"
                      >
                        <FiShare2 size={16} />
                      </motion.button>
                      <motion.button
                        className="icon-button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Tải xuống"
                      >
                        <FiDownload size={16} />
                      </motion.button>
                    </div>
                  </div>
                  <div className="result-text">
                    {result}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="empty-icon"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    🎨
                  </motion.div>
                  <div className="empty-text">
                    <p>Chọn một màu yêu thích và khám phá những điều thú vị về tính cách của bạn!</p>
                    <motion.div 
                      className="empty-icons"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FiEye />
                      <FiHeart />
                      <FiStar />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}

export default App;