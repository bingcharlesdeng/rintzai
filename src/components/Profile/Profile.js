import React, { useState, useEffect } from 'react';
import './profile.css';
import ProfileHeader from './ProfileHeader';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';
import ProfileActions from './ProfileActions';
import Navbar from '../Navbar';
import { useUserContext } from '../UserContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import LoadingSpinner from '../LoadingSpinner';


const Profile = () => {
  const { user } = useUserContext();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const profileRef = doc(db, 'profiles', user.uid);
        const profileDoc = await getDoc(profileRef);

        if (profileDoc.exists()) {
          setProfile(profileDoc.data());
        } else {
          setProfile({
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
        }

        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

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
  if (isLoading) {
    return <LoadingSpinner />;
  }
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
        <div className="avatar-container">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="User Avatar" />
          ) : (
            <div className="avatar-placeholder">Upload Avatar</div>
          )}
        </div>
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