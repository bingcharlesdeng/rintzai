import React, { useState } from 'react';
import './physicalSensations.css';

const sensations = [
  'Tension', 'Relaxation', 'Warmth', 'Cold', 'Tingling',
  'Numbness', 'Heaviness', 'Lightness', 'Pain', 'Nausea',
];

const PhysicalSensations = ({ onSensationsSelect }) => {
  const [selectedSensations, setSelectedSensations] = useState([]);

  const handleSensationClick = (sensation) => {
    const updatedSensations = selectedSensations.includes(sensation)
      ? selectedSensations.filter(s => s !== sensation)
      : [...selectedSensations, sensation];
    setSelectedSensations(updatedSensations);
    onSensationsSelect(updatedSensations);
  };

  return (
    <div className="physical-sensations">
      <h3>Physical Sensations</h3>
      <div className="sensation-buttons">
        {sensations.map(sensation => (
          <button
            key={sensation}
            className={`sensation-button ${selectedSensations.includes(sensation) ? 'selected' : ''}`}
            onClick={() => handleSensationClick(sensation)}
          >
            {sensation}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhysicalSensations;