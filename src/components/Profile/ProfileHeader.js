// ProfileHeader.js
import React, { useRef } from 'react';
import './profileHeader.css';

const ProfileHeader = ({ profile, editMode, onFieldChange, onImageUpload }) => {
  const coverImageInputRef = useRef(null);

  const handleCoverImageClick = () => {
    coverImageInputRef.current.click();
  };

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    await onImageUpload('coverImage', file);
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