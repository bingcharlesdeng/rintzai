import React, { useState } from 'react';
import './moodCheck.css';

const MoodCheck = ({ onComplete }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const moods = ['😄', '😊', '😐', '😔', '😢'];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className="mood-check">
      <h2>How are you feeling today?</h2>
      <div className="mood-options">
        {moods.map((mood, index) => (
          <button
            key={index}
            className={`mood-button ${selectedMood === mood ? 'selected' : ''}`}
            onClick={() => handleMoodSelect(mood)}
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodCheck;