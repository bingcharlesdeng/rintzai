import React, { useState } from 'react';
import './feelingWheel.css';

const feelings = {
  'Happy': ['Optimistic', 'Peaceful', 'Powerful', 'Accepted'],
  'Sad': ['Lonely', 'Vulnerable', 'Despair', 'Guilty'],
  'Angry': ['Hurt', 'Threatened', 'Hateful', 'Hostile'],
  'Fearful': ['Scared', 'Anxious', 'Insecure', 'Weak'],
  'Surprised': ['Startled', 'Confused', 'Amazed', 'Excited'],
  'Disgusted': ['Disapproval', 'Disappointed', 'Awful', 'Repelled'],
};

const FeelingWheel = ({ onFeelingsSelect }) => {
  const [selectedFeelings, setSelectedFeelings] = useState([]);

  const handleFeelingClick = (feeling) => {
    const updatedFeelings = selectedFeelings.includes(feeling)
      ? selectedFeelings.filter(f => f !== feeling)
      : [...selectedFeelings, feeling];
    setSelectedFeelings(updatedFeelings);
    onFeelingsSelect(updatedFeelings);
  };

  return (
    <div className="feeling-wheel">
      <h3>Feeling Wheel</h3>
      <div className="feeling-wheel-container">
        {Object.entries(feelings).map(([category, subFeelings]) => (
          <div key={category} className="feeling-category">
            <h4>{category}</h4>
            <div className="sub-feelings">
              {subFeelings.map(feeling => (
                <button
                  key={feeling}
                  className={`feeling-button ${selectedFeelings.includes(feeling) ? 'selected' : ''}`}
                  onClick={() => handleFeelingClick(feeling)}
                >
                  {feeling}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeelingWheel;