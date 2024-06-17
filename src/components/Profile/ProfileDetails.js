// ProfileDetails.js
import React from 'react';
import './profileDetails.css';

const ProfileDetails = ({ profile, editMode, onFieldChange }) => {
  return (
    <div className="profile-details">
      <h3 className="section-title">Details</h3>
      <div className="profile-section">
        <h4 className="subsection-title">Location</h4>
        {editMode ? (
          <input
            type="text"
            value={profile.location}
            onChange={(e) => onFieldChange('location', e.target.value)}
            className="location-input"
            placeholder="Enter your location"
          />
        ) : (
          <p className="location-text">{profile.location || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h4 className="subsection-title">Age</h4>
        {editMode ? (
          <input
            type="number"
            value={profile.age}
            onChange={(e) => onFieldChange('age', parseInt(e.target.value))}
            className="age-input"
            placeholder="Enter your age"
          />
        ) : (
          <p className="age-text">{profile.age || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h4 className="subsection-title">Gender</h4>
        {editMode ? (
          <select
            value={profile.gender}
            onChange={(e) => onFieldChange('gender', e.target.value)}
            className="gender-input"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <p className="gender-text">{profile.gender || 'N/A'}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;