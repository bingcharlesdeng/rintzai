import React from 'react';
import './AffirmationList.css';

const AffirmationList = ({ affirmations, activeCategory, onDeleteAffirmation }) => {
  const filteredAffirmations = activeCategory === 'All' 
    ? affirmations 
    : affirmations.filter(affirmation => affirmation.category === activeCategory);

  return (
    <div className="affirmation-list">
      <h2>Your Affirmations</h2>
      {filteredAffirmations.map(affirmation => (
        <div key={affirmation.id} className="affirmation-item">
          <p>{affirmation.text}</p>
          <div className="affirmation-meta">
            <span className="affirmation-category">{affirmation.category}</span>
            <button onClick={() => onDeleteAffirmation(affirmation.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AffirmationList;