import React from 'react';
import './loadingPage.css';

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Uploading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;