import React from 'react';
import './profileSection.css';

const ProfileSections = ({ profile, editMode, onFieldChange }) => {
  return (
    <div className="profile-sections">
      {/* ... */}
      <div className="profile-section">
        <h3 className="section-title">Gender</h3>
        {editMode ? (
          <select
            value={profile.gender}
            onChange={(e) => onFieldChange('gender', e.target.value)}
            className="section-content-input"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <p className="section-content">{profile.gender || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h3 className="section-title">Diagnoses</h3>
        {editMode ? (
          <input
            type="text"
            value={profile.diagnoses.join(', ')}
            onChange={(e) => onFieldChange('diagnoses', e.target.value.split(',').map((diagnosis) => diagnosis.trim()))}
            className="section-content-input"
            placeholder="Enter your diagnoses, separated by commas"
          />
        ) : (
          <p className="section-content">{profile.diagnoses.join(', ') || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h3 className="section-title">Treatments</h3>
        {editMode ? (
          <input
            type="text"
            value={profile.treatments.join(', ')}
            onChange={(e) => onFieldChange('treatments', e.target.value.split(',').map((treatment) => treatment.trim()))}
            className="section-content-input"
            placeholder="Enter your treatments, separated by commas"
          />
        ) : (
          <p className="section-content">{profile.treatments.join(', ') || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h3 className="section-title">Medications</h3>
        {editMode ? (
          <input
            type="text"
            value={profile.medications.join(', ')}
            onChange={(e) => onFieldChange('medications', e.target.value.split(',').map((medication) => medication.trim()))}
            className="section-content-input"
            placeholder="Enter your medications, separated by commas"
          />
        ) : (
          <p className="section-content">{profile.medications.join(', ') || 'N/A'}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileSections;