import React from 'react';
import './profileSidebar.css';

const ProfileSidebar = ({ profile }) => {
  return (
    <div className="profile-sidebar">
      <div className="sidebar-section">
        <h3>About Me</h3>
        <p>{profile.about || 'No bio provided'}</p>
      </div>
      <div className="sidebar-section">
        <h3>Location</h3>
        <p>{profile.location || 'N/A'}</p>
      </div>
      <div className="sidebar-section">
        <h3>Interests</h3>
        <ul>
          {profile.hobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>
      </div>
      {/* Add more sections as needed */}
    </div>
  );
};

export default ProfileSidebar;