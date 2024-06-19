import React from 'react';
import './profileActions.css';

const ProfileActions = ({ editMode, onEdit, onSave, onCancel }) => {
  console.log('ProfileActions rendered');
  console.log('editMode:', editMode);

  return (
    <div className="profile-actions">
      {editMode ? (
        <>
          <button onClick={onSave} className="save-button">
            Save
          </button>
          <button onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        </>
      ) : (
        <>
          <button onClick={onEdit} className="edit-button">
            Edit Profile
          </button>
          <button className="more-button">...</button>
        </>
      )}
    </div>
  );
};

export default ProfileActions;