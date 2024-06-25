import React from 'react';
import './loadingPage.css';

const LoadingPage = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-page">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingPage;