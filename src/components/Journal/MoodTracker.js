import React from 'react';
import './moodTracker.css';

const MoodTracker = ({ entries, onFilterChange }) => {
  console.log('Rendering MoodTracker with entries:', entries);

  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const moods = ['happy', 'sad', 'angry', 'neutral'];

  return (
    <div className="mood-tracker">
      <h3>Mood Tracker</h3>
      <div className="mood-buttons">
        {moods.map(mood => (
          <button
            key={mood}
            className={`mood-button ${mood}`}
            onClick={() => onFilterChange(mood)}
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
            <span className="mood-count">{moodCounts[mood] || 0}</span>
          </button>
        ))}
        <button
          className="mood-button all"
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
      </div>
    </div>
  );
};

export default MoodTracker;