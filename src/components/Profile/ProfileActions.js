import React from 'react';
import './profileActions.css';

const ProfileActions = ({ editMode, onEdit, onSave }) => {
  return (
    <div className="profile-actions">
      {editMode ? (
        <button onClick={onSave} className="save-button">
          Save
        </button>
      ) : (
        <button onClick={onEdit} className="edit-button">
          Edit
        </button>
      )}
    </div>
  );
};

export default ProfileActions;