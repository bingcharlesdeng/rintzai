import React from 'react';
import './profileEducationWork.css';

const ProfileEducationWork = ({ profile, editMode, onFieldChange }) => {
  return (
    <div className="profile-education-work">
      <h3 className="section-title">Education &amp; Work</h3>
      <div className="profile-section">
        <h4 className="subsection-title">Occupation</h4>
        {editMode ? (
          <input
            type="text"
            value={profile.occupation}
            onChange={(e) => onFieldChange('occupation', e.target.value)}
            className="occupation-input"
            placeholder="Enter your occupation"
          />
        ) : (
          <p className="occupation-text">{profile.occupation || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h4 className="subsection-title">Education</h4>
        {editMode ? (
          <input
            type="text"
            value={profile.education}
            onChange={(e) => onFieldChange('education', e.target.value)}
            className="education-input"
            placeholder="Enter your education"
          />
        ) : (
          <p className="education-text">{profile.education || 'N/A'}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileEducationWork;