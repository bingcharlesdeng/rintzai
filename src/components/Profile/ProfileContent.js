import React, { useState } from 'react';
import './profileContent.css';
import ProfileMentalHealth from './ProfileMentalHealth';
import ProfileInterests from './ProfileInterests';
import ProfileEducationWork from './ProfileEducationWork';
import ProfilePosts from './ProfilePosts';
import ProfileAbout from './ProfileAbout';
import ProfileFriends from './ProfileFriends';
import ProfilePhotos from './ProfilePhotos';

const ProfileContent = ({ profile, editMode, onFieldChange }) => {
  const [activeTab, setActiveTab] = useState('Posts');

  console.log('ProfileContent rendered');
  console.log('activeTab:', activeTab);
  console.log('profile:', profile);
  console.log('editMode:', editMode);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Posts':
        return <ProfilePosts posts={profile.posts} />;
      case 'About':
        return <ProfileAbout profile={profile} editMode={editMode} onFieldChange={onFieldChange} />;
      case 'Friends':
        return <ProfileFriends friends={profile.friends} />;
      case 'Photos':
        return <ProfilePhotos photos={profile.photos} />;
      case 'Mental Health':
        return <ProfileMentalHealth profile={profile} editMode={editMode} onFieldChange={onFieldChange} />;
      case 'Interests':
        return <ProfileInterests profile={profile} editMode={editMode} onFieldChange={onFieldChange} />;
      case 'Education & Work':
        return <ProfileEducationWork profile={profile} editMode={editMode} onFieldChange={onFieldChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="profile-content">
      <div className="profile-tabs">
        <div
          className={`tab ${activeTab === 'Posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('Posts')}
        >
          Posts
        </div>
        <div
          className={`tab ${activeTab === 'About' ? 'active' : ''}`}
          onClick={() => setActiveTab('About')}
        >
          About
        </div>
        <div
          className={`tab ${activeTab === 'Friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('Friends')}
        >
          Friends
        </div>
        <div
          className={`tab ${activeTab === 'Photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('Photos')}
        >
          Photos
        </div>
        <div
          className={`tab ${activeTab === 'Mental Health' ? 'active' : ''}`}
          onClick={() => setActiveTab('Mental Health')}
        >
          Mental Health
        </div>
        <div
          className={`tab ${activeTab === 'Interests' ? 'active' : ''}`}
          onClick={() => setActiveTab('Interests')}
        >
          Interests
        </div>
        <div
          className={`tab ${activeTab === 'Education & Work' ? 'active' : ''}`}
          onClick={() => setActiveTab('Education & Work')}
        >
          Education & Work
        </div>
      </div>
      <div className="profile-tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default ProfileContent;