import React, { useState, useEffect } from 'react';
import './profile.css';
import ProfileHeader from './ProfileHeader';
import ProfileSections from './ProfileSections';
import ProfileActions from './ProfileActions';
import Navbar from '../Navbar';
import { useUserContext } from '../UserContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

const Profile = () => {
  const { user } = useUserContext();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    coverImage: '',
    avatarUrl: '',
    name: '',
    location: '',
    about: '',
    mentalHealthJourney: '',
    favoriteQuotes: [],
    hobbies: [],
    occupation: '',
    education: '',
    age: '',
    gender: '',
    diagnoses: [],
    treatments: [],
    medications: [],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const profileRef = doc(db, 'profiles', user.uid);
        const profileDoc = await getDoc(profileRef);

        if (profileDoc.exists()) {
          setProfile(profileDoc.data());
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    if (user) {
      const profileRef = doc(db, 'profiles', user.uid);
      await setDoc(profileRef, profile);
    }
    setEditMode(false);
  };

  const handleChange = (field, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleImageUpload = async (field, file) => {
    if (user && file) {
      const storageRef = ref(storage, `profiles/${user.uid}/${field}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setProfile((prevProfile) => ({
          ...prevProfile,
          [field]: downloadURL,
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle the error, show an error message, or perform any necessary actions
      }
    }
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-content">
        <ProfileHeader
          profile={profile}
          editMode={editMode}
          onFieldChange={handleChange}
          onImageUpload={handleImageUpload}
        />
        <div className="profile-main">
          <div className="profile-sidebar">
            <div className="profile-intro">
              <h3>Intro</h3>
              <p>{profile.about || 'N/A'}</p>
            </div>
            <div className="profile-photos">
              <h3>Photos</h3>
              {/* Add photo gallery component or placeholder */}
            </div>
            <div className="profile-friends">
              <h3>Friends</h3>
              {/* Add friends list component or placeholder */}
            </div>
          </div>
          <div className="profile-sections">
            <ProfileSections profile={profile} editMode={editMode} onFieldChange={handleChange} />
          </div>
        </div>
        <ProfileActions editMode={editMode} onEdit={handleEdit} onSave={handleSave} />
      </div>
    </div>
  );
};

export default Profile;