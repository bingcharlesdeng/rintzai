import React, { useState, useEffect } from 'react';
import './profile.css';
import ProfileHeader from './ProfileHeader';
import ProfileNavigation from './ProfileNavigation';
import ProfileContent from './ProfileContent';
import ProfileSidebar from './ProfileSidebar';
import { useUserContext } from '../User/UserContext';
import { fetchUserProfile, fetchUserMoodEntries, updateUserProfile } from './profileService';
import LoadingSpinner from '../LoadingSpinner';
import Navbar from '../Routes/Navbar';
import { db } from '../../firebase/firebase';


const Profile = () => {
  const { user } = useUserContext();
  const [activeTab, setActiveTab] = useState('Journey');
  const [profile, setProfile] = useState(null);
  const [moodEntries, setMoodEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Profile component mounted');
    const loadProfileData = async () => {
      if (user && user.uid) {
        console.log('Fetching profile data for user:', user.uid);
        try {
          const profileData = await fetchUserProfile(user.uid);
          setProfile(profileData);
          console.log('Profile data fetched:', profileData);

          const moodData = await fetchUserMoodEntries(user.uid);
          setMoodEntries(moodData);
          console.log('Mood entries fetched:', moodData);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log('User not logged in or user ID not available');
        setIsLoading(false);
      }
    };

    loadProfileData();

    return () => {
      console.log('Profile component unmounted');
    };
  }, [user]);

  const handleProfileUpdate = async (updatedProfile) => {
    console.log('Updating profile:', updatedProfile);
    try {
      const updated = await updateUserProfile(user.uid, updatedProfile);
      setProfile(updated);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user || !profile) {
    return <div>Please log in to view your profile.</div>;
  }

  const latestMood = moodEntries.length > 0 ? moodEntries[moodEntries.length - 1].mood : null;

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <ProfileHeader
          profile={profile}
          latestMood={latestMood}
          isOwnProfile={true}
          onProfileUpdate={handleProfileUpdate}
        />
        <div className="profile-content">
          <ProfileSidebar profile={profile} />
          <div className="profile-main">
            <ProfileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <ProfileContent 
              profile={profile} 
              activeTab={activeTab} 
              moodEntries={moodEntries}
              onProfileUpdate={handleProfileUpdate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;