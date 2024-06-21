import React, { useState } from 'react';
import './significantChanges.css';

const changes = [
  'Sleep', 'Diet', 'Exercise', 'Work', 'Relationships',
  'Finances', 'Health', 'Living Situation', 'Major Life Event'
];

const SignificantChanges = ({ onChangesSelect }) => {
  const [selectedChanges, setSelectedChanges] = useState([]);

  const handleChangeClick = (change) => {
    const updatedChanges = selectedChanges.includes(change)
      ? selectedChanges.filter(c => c !== change)
      : [...selectedChanges, change];
    setSelectedChanges(updatedChanges);
    onChangesSelect(updatedChanges);
  };

  return (
    <div className="significant-changes">
      <h3>Significant Changes</h3>
      <div className="change-buttons">
        {changes.map(change => (
          <button
            key={change}
            className={`change-button ${selectedChanges.includes(change) ? 'selected' : ''}`}
            onClick={() => handleChangeClick(change)}
          >
            {change}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SignificantChanges;