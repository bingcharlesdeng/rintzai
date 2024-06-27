import React from 'react';
import './DailyAffirmation.css';

const DailyAffirmation = ({ affirmation }) => {
  return (
    <div className="daily-affirmation">
      <h2>Your Daily Affirmation</h2>
      <div className="affirmation-content">
        <p>{affirmation.text}</p>
        <button className="share-button">Share</button>
      </div>
    </div>
  );
};

export default DailyAffirmation;