import React, { useRef } from 'react';
import './profileHeader.css';
import ProfileActions from './ProfileActions';

const ProfileHeader = ({ profile, editMode, onFieldChange, onImageUpload, onEdit, onSave, onCancel }) => {
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
          <div className="cover-placeholder">Add Cover Photo</div>
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
        <div className="avatar">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="User Avatar" />
          ) : (
            <div className="avatar-placeholder">Add Photo</div>
          )}
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
      <ProfileActions editMode={editMode} onEdit={onEdit} onSave={onSave} onCancel={onCancel} />
    </div>
  );
};

export default ProfileHeader;