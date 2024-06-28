import React, { useState, useEffect } from 'react';
import './MoodBasedRecommendations.css';

const MoodBasedRecommendations = ({ data, onFeedback }) => {
  console.log('Rendering MoodBasedRecommendations with data:', data);
  const [selectedMood, setSelectedMood] = useState(Object.keys(data)[0]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setSelectedMood(Object.keys(data)[0]);
    }
  }, [data]);

  if (!data || Object.keys(data).length === 0) {
    return <div className="no-recommendations">No mood-based recommendations available at the moment.</div>;
  }

  return (
    <div className="mood-based-recommendations">
      <h2>Mood-Based Recommendations</h2>
      <div className="mood-selector">
        <label htmlFor="mood-select">Select your current mood:</label>
        <select 
          id="mood-select" 
          value={selectedMood} 
          onChange={(e) => setSelectedMood(e.target.value)}
        >
          {Object.keys(data).map(mood => (
            <option key={mood} value={mood}>{mood}</option>
          ))}
        </select>
      </div>
      <div className="mood-recommendations">
        <h3>Recommendations for {selectedMood} mood:</h3>
        <ul>
          {data[selectedMood].map((recommendation) => (
            <li key={recommendation.id}>
              <h4>{recommendation.title}</h4>
              <p>{recommendation.description}</p>
              <div className="recommendation-feedback">
                <button onClick={() => onFeedback('moodBased', recommendation.id, 'positive')}>👍</button>
                <button onClick={() => onFeedback('moodBased', recommendation.id, 'negative')}>👎</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoodBasedRecommendations;