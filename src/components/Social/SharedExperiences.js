import React, { useState, useEffect } from 'react';
import { fetchSharedExperiences, shareExperience } from './socialService';
import './SharedExperiences.css';

const SharedExperiences = ({ userData, onDataUpdate }) => {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState('');

  useEffect(() => {
    const loadExperiences = async () => {
      const fetchedExperiences = await fetchSharedExperiences();
      setExperiences(fetchedExperiences);
    };
    loadExperiences();
  }, []);

  const handleShareExperience = async () => {
    if (newExperience.trim()) {
      try {
        const sharedExperience = await shareExperience(userData.id, newExperience);
        setExperiences([sharedExperience, ...experiences]);
        setNewExperience('');
        onDataUpdate({ sharedExperiences: [...userData.sharedExperiences, sharedExperience.id] });
      } catch (error) {
        console.error('Error sharing experience:', error);
      }
    }
  };

  return (
    <div className="shared-experiences">
      <h2>Shared Experiences</h2>
      <div className="share-experience">
        <textarea
          value={newExperience}
          onChange={(e) => setNewExperience(e.target.value)}
          placeholder="Share your experience..."
        />
        <button onClick={handleShareExperience}>Share</button>
      </div>
      <div className="experiences-list">
        {experiences.map(experience => (
          <div key={experience.id} className="experience-item">
            <p>{experience.content}</p>
            <div className="experience-meta">
              <span>Shared by: {experience.userName}</span>
              <span>Date: {new Date(experience.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedExperiences;