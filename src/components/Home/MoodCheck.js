import React, { useState } from 'react';
import './moodCheck.css';

const MoodCheck = ({ onComplete }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const moods = [
    { emoji: '😄', label: 'Happy' },
    { emoji: '😊', label: 'Content' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😢', label: 'Upset' },
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setTimeout(() => {
      onComplete(mood);
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
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="mood-label">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodCheck;