import React from 'react';
import './moodIndicator.css';

const MoodIndicator = ({ mood }) => {
  if (!mood) return null;

  return (
    <div className="mood-indicator">
      <span className="mood-label">Current Mood:</span>
      <span className={`mood-value ${mood.toLowerCase()}`}>{mood}</span>
    </div>
  );
};

export default MoodIndicator;