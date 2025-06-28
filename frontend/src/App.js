import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from "react-colorful";
import { 
  FiSun, 
  FiMoon, 
  FiDroplet, 
  FiStar, 
  FiEye,
  FiHeart,
  FiZap
} from 'react-icons/fi';
import CatLoading from './components/CatLoading';
import './App.css';

function App() {
  // State management
  const [colorInput, setColorInput] = useState("#6366f1");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  // Theme toggle effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // API call to analyze color
  const handleSubmit = async () => {
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
      }, 1000);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setResult("🚫 Lỗi kết nối tới backend. Vui lòng kiểm tra server đang chạy.");
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="app-container">
      {/* Theme Toggle */}
      <button
        className="theme-toggle"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      {/* Header */}
      <header className="app-header">
        <div className="hero-section">
          <h1 className="hero-title">
            AI Màu Sắc Thông Minh
          </h1>
          <p className="hero-subtitle">
            Khám phá ý nghĩa sâu sắc và tính cách ẩn giấu trong từng màu sắc với công nghệ AI tiên tiến
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Color Picker Section */}
        <section className="color-picker-section">
          <div className="picker-card">
            <div className="color-picker-container">
              <div className="picker-wrapper">
                <HexColorPicker 
                  color={colorInput} 
                  onChange={setColorInput}
                />
              </div>

              <div className="color-info">
                <div
                  className="color-preview"
                  style={{ backgroundColor: colorInput }}
                />
                
                <div className="hex-display">
                  {colorInput.toUpperCase()}
                </div>

                <button
                  className="analyze-button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <FiDroplet />
                      <span>Đang phân tích...</span>
                    </>
                  ) : (
                    <>
                      <FiZap />
                      <span>Phân tích màu sắc</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="results-section">
          <div className="result-card">
            {isLoading ? (
              <CatLoading 
                message="AI đang khám phá bí mật của màu sắc bạn chọn... ✨"
              />
            ) : result ? (
              <div className="result-content">
                {result}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  🎨
                </div>
                <div className="empty-text">
                  <p>Chọn một màu yêu thích và khám phá những điều thú vị về tính cách của bạn!</p>
                  <div className="empty-icons">
                    <FiEye />
                    <FiHeart />
                    <FiStar />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;