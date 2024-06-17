import React from 'react';
import './profileMentalHealth.css';

const ProfileMentalHealth = ({ profile, editMode, onFieldChange }) => {
  return (
    <div className="profile-mental-health">
      <h3 className="section-title">Mental Health Journey</h3>
      {editMode ? (
        <textarea
          value={profile.mentalHealthJourney}
          onChange={(e) => onFieldChange('mentalHealthJourney', e.target.value)}
          className="mental-health-input"
          placeholder="Share your mental health journey"
        />
      ) : (
        <p className="mental-health-text">{profile.mentalHealthJourney || 'N/A'}</p>
      )}
      <div className="profile-section">
        <h4 className="subsection-title">Diagnoses</h4>
        {editMode ? (
          <input
            type="text"
            value={profile.diagnoses.join(', ')}
            onChange={(e) => onFieldChange('diagnoses', e.target.value.split(',').map((diagnosis) => diagnosis.trim()))}
            className="diagnoses-input"
            placeholder="Enter your diagnoses, separated by commas"
          />
        ) : (
          <p className="diagnoses-text">{profile.diagnoses.join(', ') || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h4 className="subsection-title">Treatments</h4>
        {editMode ? (
          <input
            type="text"
            value={profile.treatments.join(', ')}
            onChange={(e) => onFieldChange('treatments', e.target.value.split(',').map((treatment) => treatment.trim()))}
            className="treatments-input"
            placeholder="Enter your treatments, separated by commas"
          />
        ) : (
          <p className="treatments-text">{profile.treatments.join(', ') || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h4 className="subsection-title">Medications</h4>
        {editMode ? (
          <input
            type="text"
            value={profile.medications.join(', ')}
            onChange={(e) => onFieldChange('medications', e.target.value.split(',').map((medication) => medication.trim()))}
            className="medications-input"
            placeholder="Enter your medications, separated by commas"
          />
        ) : (
          <p className="medications-text">{profile.medications.join(', ') || 'N/A'}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileMentalHealth;