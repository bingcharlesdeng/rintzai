import React from 'react';
import './profileContent.css';
import JourneyPosts from './JourneyPosts';
import SupportNetwork from './SupportNetwork';
import Milestones from './Milestones';
import RecoveryGoals from './RecoveryGoals';
import TherapyNotes from './TherapyNotes';
import MoodOverview from './MoodOverview';

const ProfileContent = ({ profile, activeTab, moodEntries, onProfileUpdate, editMode, onFieldChange }) => {
  console.log('Rendering ProfileContent', { activeTab, profile });

  const renderContent = () => {
    switch (activeTab) {
      case 'Journey':
        return <JourneyPosts posts={profile.journeyPosts} onProfileUpdate={onProfileUpdate} editMode={editMode} onFieldChange={onFieldChange} />;
      case 'Support Network':
        return <SupportNetwork network={profile.supportNetwork} onProfileUpdate={onProfileUpdate} editMode={editMode} onFieldChange={onFieldChange} />;
      case 'Milestones':
        return <Milestones milestones={profile.milestones} onProfileUpdate={onProfileUpdate} editMode={editMode} onFieldChange={onFieldChange} />;
      case 'Recovery Goals':
        return <RecoveryGoals goals={profile.recoveryGoals} onProfileUpdate={onProfileUpdate} editMode={editMode} onFieldChange={onFieldChange} />;
      case 'Therapy Notes':
        return <TherapyNotes notes={profile.therapyNotes} onProfileUpdate={onProfileUpdate} editMode={editMode} onFieldChange={onFieldChange} />;
      case 'Mood Overview':
        return <MoodOverview moodEntries={moodEntries} editMode={editMode} onFieldChange={onFieldChange} />;
      default:
        console.log('Unknown tab selected:', activeTab);
        return null;
    }
  };

  return (
    <div className="profile-content-container">
      {renderContent()}
    </div>
  );
};

export default ProfileContent;