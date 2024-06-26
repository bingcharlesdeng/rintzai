import React from 'react';
import './loadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary', text = 'Loading...' }) => {
  return (
    <div className={`loading-spinner-container ${size}`}>
      <div className={`loading-spinner ${color}`}></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;