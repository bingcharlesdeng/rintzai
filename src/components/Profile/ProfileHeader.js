// ProfileHeader.js
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
    await onImageUpload('coverImage', file);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    await onImageUpload('avatarUrl', file);
  };

  return (
    <div className="profile-header">
      <div className="cover-image" onClick={editMode ? handleCoverImageClick : null}>
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
      <div className="header-content">
        <div className="avatar" onClick={editMode ? handleAvatarClick : null}>
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
        <div className="profile-name">
          {editMode ? (
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              className="name-input"
              placeholder="Name"
            />
          ) : (
            <h2 className="name">{profile.name || 'N/A'}</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;