import React, { useState } from 'react';
import './dailyChallenge.css';

const DailyChallenge = () => {
  const [isCompleted, setIsCompleted] = useState(false);

  const challenge = {
    title: "Today's Challenge",
    description: "Write down three things you're grateful for.",
  };

  const handleComplete = () => {
    setIsCompleted(true);
    // Here you would typically update this in your backend
  };

  return (
    <div className="daily-challenge">
      <h3>{challenge.title}</h3>
      <p>{challenge.description}</p>
      <button 
        className={`challenge-button ${isCompleted ? 'completed' : ''}`}
        onClick={handleComplete}
        disabled={isCompleted}
      >
        {isCompleted ? 'Completed!' : 'Mark as Complete'}
      </button>
    </div>
  );
};

export default DailyChallenge;