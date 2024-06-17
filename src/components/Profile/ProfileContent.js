import React from 'react';
import './profileContent.css';
import ProfileMentalHealth from './ProfileMentalHealth';
import ProfileInterests from './ProfileInterests';
import ProfileEducationWork from './ProfileEducationWork';

const ProfileContent = ({ profile, editMode, onFieldChange }) => {
  return (
    <div className="profile-content">
      <ProfileMentalHealth profile={profile} editMode={editMode} onFieldChange={onFieldChange} />
      <ProfileInterests profile={profile} editMode={editMode} onFieldChange={onFieldChange} />
      <ProfileEducationWork profile={profile} editMode={editMode} onFieldChange={onFieldChange} />
    </div>
  );
};

export default ProfileContent;