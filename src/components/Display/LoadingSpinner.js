// LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-overlay">
        <div className="spinner"></div>
        <p>Uploading...</p>
    </div>
  );
};

export default LoadingSpinner;