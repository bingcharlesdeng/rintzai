import React, { useState } from 'react';
import './SocialProfile.css';

const SocialProfile = ({ userData, onDataUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: userData.name,
    bio: userData.bio,
    interests: userData.interests,
  });

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditedProfile({
        name: userData.name,
        bio: userData.bio,
        interests: userData.interests,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      await onDataUpdate(editedProfile);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="social-profile">
      <h2>Social Profile</h2>
      {editMode ? (
        <div className="edit-profile">
          <input
            type="text"
            name="name"
            value={editedProfile.name}
            onChange={handleInputChange}
            placeholder="Your Name"
          />
          <textarea
            name="bio"
            value={editedProfile.bio}
            onChange={handleInputChange}
            placeholder="About You"
          />
          <input
            type="text"
            name="interests"
            value={editedProfile.interests}
            onChange={handleInputChange}
            placeholder="Your Interests (comma-separated)"
          />
          <button onClick={handleSaveProfile}>Save Profile</button>
          <button onClick={handleEditToggle}>Cancel</button>
        </div>
      ) : (
        <div className="view-profile">
          <h3>{userData.name}</h3>
          <p>{userData.bio}</p>
          <p>Interests: {userData.interests.join(', ')}</p>
          <button onClick={handleEditToggle}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default SocialProfile;