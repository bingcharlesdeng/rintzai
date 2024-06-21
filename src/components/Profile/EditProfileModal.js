import React, { useState } from 'react';
import './editProfileModal.css';
import { updateUserProfile } from './profileService';

const EditProfileModal = ({ profile, onClose, onProfileUpdate }) => {
  const [name, setName] = useState(profile.name || '');
  const [tagline, setTagline] = useState(profile.tagline || '');
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateUserProfile(profile.id, { name, tagline, avatarUrl });
      onProfileUpdate(updatedProfile);
      onClose();
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tagline">Tagline</label>
            <input
              type="text"
              id="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="avatarUrl">Avatar URL</label>
            <input
              type="url"
              id="avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="save-button">Save Changes</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;