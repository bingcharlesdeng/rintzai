import React from 'react';
import './profileAbout.css';

const ProfileAbout = ({ profile, editMode, onFieldChange }) => {
  return (
    <div className="profile-about">
      <h2 className="section-title">About</h2>
      {editMode ? (
        <textarea
          value={profile.about}
          onChange={(e) => onFieldChange('about', e.target.value)}
          className="about-input"
          placeholder="Write a short intro..."
        />
      ) : (
        <p className="about-text">{profile.about || 'No bio provided'}</p>
      )}
    </div>
  );
};

export default ProfileAbout;