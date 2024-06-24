import React from 'react';
import './loadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`loading-spinner-container ${size}`}>
      <div className={`loading-spinner ${color}`}></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;