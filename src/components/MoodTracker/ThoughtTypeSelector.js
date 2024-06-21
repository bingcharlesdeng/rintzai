import React, { useState } from 'react';
import './thoughtTypeSelector.css';

const thoughtTypes = [
  'All-or-Nothing',
  'Overgeneralization',
  'Mental Filter',
  'Disqualifying the Positive',
  'Jumping to Conclusions',
  'Magnification or Minimization',
  'Emotional Reasoning',
  'Should Statements',
  'Labeling',
  'Personalization',
];

const ThoughtTypeSelector = ({ onThoughtTypeSelect }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    onThoughtTypeSelect(type);
  };

  return (
    <div className="thought-type-selector">
      <h3>Type of Thoughts</h3>
      <div className="thought-type-buttons">
        {thoughtTypes.map(type => (
          <button
            key={type}
            className={`thought-type-button ${selectedType === type ? 'selected' : ''}`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThoughtTypeSelector;