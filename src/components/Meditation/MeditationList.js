import React from 'react';
import './MeditationList.css';

const MeditationList = ({ meditations, onSelectMeditation }) => {
  return (
    <div className="meditation-list">
      <h2>Guided Meditations</h2>
      <ul>
        {meditations.map((meditation) => (
          <li key={meditation.id} onClick={() => onSelectMeditation(meditation)}>
            <img src={meditation.thumbnailUrl} alt={meditation.title} />
            <div className="meditation-info">
              <h3>{meditation.title}</h3>
              <p>{meditation.duration} minutes - {meditation.category}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeditationList;