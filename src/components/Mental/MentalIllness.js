import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import { db, collection, query, where, getDocs, addDoc, updateDoc, doc } from '../../firebase/firebase';
import EducationalContent from './EducationalContent';
import PersonalStories from './PersonalStories';
import SelfAssessment from './SelfAssessment';
import CopingStrategies from './CopingStrategies';
import CrisisSupport from './CrisisSupport';
import PersonalizedDashboard from './PersonalizedDashboard';
import AccessibilityOptions from './AccessibilityOptions';
import PrivacySettings from './PrivacySettings';
import './MentalIllness.css';
import Navbar from '../Routes/Navbar';

const MentalIllness = () => {
  const { user } = useUserContext();
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState('education');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = collection(db, 'users');
        const q = query(userRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0].data());
        } else {
          const newUserData = {
            userId: user.uid,
            preferences: {},
            assessments: [],
            goals: [],
          };
          const docRef = await addDoc(collection(db, 'users'), newUserData);
          setUserData({ id: docRef.id, ...newUserData });
        }
      }
    };
    fetchUserData();
  }, [user]);

  const updateUserData = async (newData) => {
    if (userData && userData.id) {
      const userRef = doc(db, 'users', userData.id);
      await updateDoc(userRef, newData);
      setUserData({ ...userData, ...newData });
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'education':
        return <EducationalContent />;
      case 'stories':
        return <PersonalStories userId={user.uid} />;
      case 'assessment':
        return <SelfAssessment userData={userData} updateUserData={updateUserData} />;
      case 'coping':
        return <CopingStrategies userData={userData} updateUserData={updateUserData} />;
      case 'crisis':
        return <CrisisSupport />;
      case 'dashboard':
        return <PersonalizedDashboard userData={userData} updateUserData={updateUserData} />;
      case 'accessibility':
        return <AccessibilityOptions userData={userData} updateUserData={updateUserData} />;
      case 'privacy':
        return <PrivacySettings userData={userData} updateUserData={updateUserData} />;
      default:
        return <EducationalContent />;
    }
  };

  return (
    <>
    <Navbar/>
    <div className="mental-illness-container">
      <h1>Mental Health Support and Education</h1>
      <nav className="mental-illness-nav">
        <button onClick={() => setActiveSection('education')}>Educational Content</button>
        <button onClick={() => setActiveSection('stories')}>Personal Stories</button>
        <button onClick={() => setActiveSection('assessment')}>Self-Assessment</button>
        <button onClick={() => setActiveSection('coping')}>Coping Strategies</button>
        <button onClick={() => setActiveSection('crisis')}>Crisis Support</button>
        <button onClick={() => setActiveSection('dashboard')}>My Dashboard</button>
        <button onClick={() => setActiveSection('accessibility')}>Accessibility</button>
        <button onClick={() => setActiveSection('privacy')}>Privacy</button>
      </nav>
      <main className="mental-illness-content">
        {renderActiveSection()}
      </main>
    </div>
    </>
  );
};

export default MentalIllness;