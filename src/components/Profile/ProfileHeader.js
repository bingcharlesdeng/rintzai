import React, { useState } from 'react';
import './profileHeader.css';
import MoodIndicator from './MoodIndicator';
import EditProfileModal from './EditProfileModal';
import MessageModal from './MessageModal';
import { useUserContext } from '../User/UserContext';
import { updateFriendStatus, supportUser } from './profileService';
import defaultAvatar from '../../assets/default-avatar.png';

const ProfileHeader = ({ profile, latestMood, isOwnProfile, onProfileUpdate }) => {
  const { user } = useUserContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [error, setError] = useState(null);

  console.log('Rendering ProfileHeader', { profile, latestMood, isOwnProfile });

  if (!profile) {
    console.log('Profile data not available');
    return <div className="profile-header">Loading profile...</div>;
  }

  const handleEditProfile = () => {
    console.log('Opening edit profile modal');
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    console.log('Closing edit profile modal');
    setIsEditModalOpen(false);
  };

  const handleMessage = () => {
    console.log('Opening message modal');
    setIsMessageModalOpen(true);
  };

  const handleCloseMessageModal = () => {
    console.log('Closing message modal');
    setIsMessageModalOpen(false);
  };

  const handleAddFriend = async () => {
    console.log('Adding friend:', profile.id);
    try {
      await updateFriendStatus(user.uid, profile.id, 'pending');
      setError(null);
      console.log('Friend request sent successfully');
    } catch (error) {
      console.error('Error adding friend:', error);
      setError('Failed to add friend. Please try again.');
    }
  };

  const handleSupport = async () => {
    console.log('Supporting user:', profile.id);
    try {
      await supportUser(user.uid, profile.id);
      setError(null);
      console.log('User supported successfully');
    } catch (error) {
      console.error('Error supporting user:', error);
      setError('Failed to support user. Please try again.');
    }
  };

  return (
    <div className="profile-header">
      <div className="header-content">
        <div className="avatar">
          <img 
            src={profile.avatarUrl || defaultAvatar} 
            alt={`${profile.name}'s avatar`} 
            onError={(e) => {
              console.log('Error loading avatar, using default');
              e.target.onerror = null; 
              e.target.src = defaultAvatar;
            }}
          />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{profile.name || 'Anonymous User'}</h2>
          <p className="profile-tagline">{profile.tagline || 'No tagline set'}</p>
          <MoodIndicator mood={latestMood} />
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-value">{profile.daysClean || 0}</span>
          <span className="stat-label">Days Clean</span>
        </div>
        <div className="stat">
          <span className="stat-value">{profile.supportNetwork?.length || 0}</span>
          <span className="stat-label">Supporters</span>
        </div>
        <div className="stat">
          <span className="stat-value">{profile.milestones?.length || 0}</span>
          <span className="stat-label">Milestones</span>
        </div>
      </div>
      <div className="profile-actions">
        {isOwnProfile ? (
          <button className="action-button" onClick={handleEditProfile}>Edit Profile</button>
        ) : (
          <>
            <button className="action-button" onClick={handleMessage}>Message</button>
            <button className="action-button" onClick={handleAddFriend}>Add Friend</button>
            <button className="action-button" onClick={handleSupport}>Support</button>
          </>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
      {isEditModalOpen && (
        <EditProfileModal
          profile={profile}
          onClose={handleCloseEditModal}
          onProfileUpdate={onProfileUpdate}
        />
      )}
      {isMessageModalOpen && (
        <MessageModal
          recipientId={profile.id}
          recipientName={profile.name}
          onClose={handleCloseMessageModal}
        />
      )}
    </div>
  );
};

export default ProfileHeader;