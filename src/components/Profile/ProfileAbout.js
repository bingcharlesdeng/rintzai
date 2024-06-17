// ProfileAbout.js
import React from 'react';
import './profileAbout.css';

const ProfileAbout = ({ profile, editMode, onFieldChange }) => {
  return (
    <div className="profile-about">
      <h3 className="section-title">About</h3>
      {editMode ? (
        <textarea
          value={profile.about}
          onChange={(e) => onFieldChange('about', e.target.value)}
          className="about-input"
          placeholder="Tell us about yourself"
        />
      ) : (
        <p className="about-text">{profile.about || 'N/A'}</p>
      )}
    </div>
  );
};

export default ProfileAbout;