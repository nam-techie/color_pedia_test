import React, { useState, useEffect } from 'react';
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

  // Theme toggle effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

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
      }, 1500);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setResult("🚫 Lỗi kết nối tới backend. Vui lòng kiểm tra server đang chạy.");
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="app-container">
      {/* Copy toast notification */}
      {showCopyToast && (
        <div className="copy-toast">
          <FiCopy size={16} />
          Đã sao chép màu!
        </div>
      )}

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
            <span className="title-gradient">AI Màu Sắc Thông Minh</span>
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
                
                <div className="color-controls">
                  <div 
                    className="hex-display"
                    onClick={copyToClipboard}
                    style={{ cursor: 'pointer' }}
                  >
                    {colorInput.toUpperCase()}
                    <FiCopy size={14} style={{ marginLeft: '8px', opacity: 0.7 }} />
                  </div>

                  <div className="action-buttons">
                    <button
                      className="icon-button"
                      onClick={generateRandomColor}
                      title="Màu ngẫu nhiên"
                    >
                      <FiRefreshCw size={16} />
                    </button>
                    
                    <button
                      className="icon-button"
                      onClick={copyToClipboard}
                      title="Sao chép"
                    >
                      <FiCopy size={16} />
                    </button>
                  </div>
                </div>

                <button
                  className="analyze-button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner">
                        <FiDroplet />
                      </div>
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
                <div className="result-header">
                  <h3>Kết quả phân tích</h3>
                  <div className="result-actions">
                    <button className="icon-button" title="Chia sẻ">
                      <FiShare2 size={16} />
                    </button>
                    <button className="icon-button" title="Tải xuống">
                      <FiDownload size={16} />
                    </button>
                  </div>
                </div>
                <div className="result-text">
                  {result}
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🎨</div>
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