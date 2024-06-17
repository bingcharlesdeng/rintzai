import React, { useRef } from 'react';
import './profileHeader.css';

const ProfileHeader = ({ profile, editMode, onFieldChange, onImageUpload }) => {
  const coverImageInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const handleCoverImageClick = () => {
    coverImageInputRef.current.click();
  };

  const handleAvatarClick = () => {
    avatarInputRef.current.click();
  };

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    try {
      await onImageUpload('coverImage', file);
    } catch (error) {
      console.error('Error uploading cover image:', error);
      // Handle the error, show an error message, or perform any necessary actions
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    try {
      await onImageUpload('avatarUrl', file);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      // Handle the error, show an error message, or perform any necessary actions
    }
  };

  return (
    <div className="profile-header">
      <div className="profile-cover" onClick={editMode ? handleCoverImageClick : null}>
        {profile.coverImage ? (
          <img src={profile.coverImage} alt="Cover" />
        ) : (
          <div className="cover-placeholder">Upload Cover Image</div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={coverImageInputRef}
          style={{ display: 'none' }}
          onChange={handleCoverImageUpload}
        />
      </div>
      <div className="profile-info">
        <div className="profile-avatar" onClick={editMode ? handleAvatarClick : null}>
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="User Avatar" />
          ) : (
            <div className="avatar-placeholder">Upload Avatar</div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={avatarInputRef}
            style={{ display: 'none' }}
            onChange={handleAvatarUpload}
          />
        </div>
        {editMode ? (
          <input
            type="text"
            value={profile.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
            className="profile-name-input"
            placeholder="Name"
          />
        ) : (
          <h2 className="profile-name">{profile.name || 'N/A'}</h2>
        )}
        {editMode ? (
          <input
            type="text"
            value={profile.location}
            onChange={(e) => onFieldChange('location', e.target.value)}
            className="profile-location-input"
            placeholder="Location"
          />
        ) : (
          <p className="profile-location">{profile.location || 'N/A'}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;