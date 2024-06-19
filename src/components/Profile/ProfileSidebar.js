import React from 'react';
import './profileSidebar.css';

const ProfileSidebar = ({ profile, editMode, onFieldChange }) => {
  console.log('ProfileSidebar rendered');
  console.log('profile:', profile);
  console.log('editMode:', editMode);

  return (
    <div className="profile-sidebar">
      <div className="sidebar-section">
        <h3>Intro</h3>
        {editMode ? (
          <textarea
            value={profile.about}
            onChange={(e) => onFieldChange('about', e.target.value)}
            className="about-input"
            placeholder="Write a short intro..."
          />
        ) : (
          <p>{profile.about || 'No bio provided'}</p>
        )}
      </div>
      <div className="sidebar-section">
        <h3>Details</h3>
        <p>Location: {profile.location || 'N/A'}</p>
        <p>Pronouns: {profile.pronouns || 'N/A'}</p>
      </div>
      <div className="sidebar-section">
        <h3>Featured</h3>
        {/* Add featured content */}
      </div>
      {/* Add more sections as needed */}
    </div>
  );
};

export default ProfileSidebar;