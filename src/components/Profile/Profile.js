// Profile.js
import React, { useState, useEffect } from 'react';
import './profile.css';
import ProfileHeader from './ProfileHeader'; // Import the component normally
import ProfileSidebar from './ProfileSidebar'; // Import the component normally
import ProfileContent from './ProfileContent'; // Import the component normally
import ProfileActions from './ProfileActions'; // Import the component normally
import Navbar from '../Navbar';
import { useUserContext } from '../UserContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

const Profile = () => {
  const { user } = useUserContext();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    coverImage: '',
    avatarUrl: '',
    name: '',
    about: '',
    location: '',
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

  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    if (user) {
      const profileRef = doc(db, 'profiles', user.uid);
      await setDoc(profileRef, profile);
    }
    setEditMode(false);
  };

  const handleChange = (field, value) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleImageUpload = async (field, file) => {
    if (user && file) {
      const storageRef = ref(storage, `profiles/${user.uid}/${field}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setProfile(prevProfile => ({
        ...prevProfile,
        [field]: downloadURL,
      }));
    }
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-wrapper">
        <ProfileHeader
          profile={profile}
          editMode={editMode}
          onFieldChange={handleChange}
          onImageUpload={handleImageUpload}
        />
        <div className="profile-content-wrapper">
          <ProfileSidebar profile={profile} />
          <ProfileContent
            profile={profile}
            editMode={editMode}
            onFieldChange={handleChange}
          />
        </div>
        <ProfileActions editMode={editMode} onEdit={handleEdit} onSave={handleSave} />
      </div>
    </div>
  );
};

console.log('ProfileHeader:', ProfileHeader); // Log the imported component
console.log('ProfileSidebar:', ProfileSidebar); // Log the imported component
console.log('ProfileContent:', ProfileContent); // Log the imported component
console.log('ProfileActions:', ProfileActions); // Log the imported component

export default Profile;