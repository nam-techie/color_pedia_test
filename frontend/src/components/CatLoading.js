import React from 'react';
import './CatLoading.css';

const CatLoading = ({ message = "AI đang phân tích màu sắc của bạn..." }) => {
  return (
    <div className="cat-loading-container">
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
      
      <p className="loading-message">
        {message}
      </p>
      
      {/* Simple floating hearts */}
      <div className="floating-hearts">
        <div className="heart heart-1">💖</div>
        <div className="heart heart-2">✨</div>
        <div className="heart heart-3">🌟</div>
        <div className="heart heart-4">💫</div>
      </div>
    </div>
  );
};

export default CatLoading;