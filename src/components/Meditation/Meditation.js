import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import MeditationList from './MeditationList';
import MeditationPlayer from './MeditationPlayer';
import MeditationProgress from './MeditationProgress';
import MeditationTimer from './MeditationTimer';
import MeditationSettings from './MeditationSettings';
import CustomMeditation from './CustomMeditation';
import MeditationInsights from './MeditationInsights';
import { fetchMeditations, fetchUserMeditationData } from './meditationService';
import './Meditation.css';
import Navbar from '../Routes/Navbar';

const Meditation = () => {
  const { user } = useUserContext();
  const [meditations, setMeditations] = useState([]);
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [userMeditationData, setUserMeditationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMeditationData = async () => {
      setIsLoading(true);
      try {
        const fetchedMeditations = await fetchMeditations();
        setMeditations(fetchedMeditations);

        if (user) {
          const userData = await fetchUserMeditationData(user.uid);
          setUserMeditationData(userData);
        }
      } catch (error) {
        console.error('Error loading meditation data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMeditationData();
  }, [user]);

  const handleSelectMeditation = (meditation) => {
    setSelectedMeditation(meditation);
  };

  const handleCompleteMeditation = async (duration) => {
    // Update user's meditation data
    // This would typically involve a call to your backend service
    console.log(`Completed meditation for ${duration} minutes`);
  };

  if (isLoading) {
    return <div className="loading">Loading meditation data...</div>;
  }

  return (
      
      <div className="meditation-container">
        <h1>Meditation Center</h1>
        <div className="meditation-content">
          <div className="meditation-sidebar">
            <MeditationList 
              meditations={meditations} 
              onSelectMeditation={handleSelectMeditation}
            />
            <MeditationProgress userData={userMeditationData} />
          </div>
          <div className="meditation-main">
            {selectedMeditation ? (
              <MeditationPlayer 
                meditation={selectedMeditation}
                onComplete={handleCompleteMeditation}
              />
            ) : (
              <div className="meditation-welcome">
                <h2>Welcome to your meditation journey</h2>
                <p>Select a meditation from the list to begin your practice.</p>
              </div>
            )}
            <MeditationTimer />
            <CustomMeditation />
          </div>
          <div className="meditation-sidebar">
            <MeditationSettings userData={userMeditationData} />
            <MeditationInsights userData={userMeditationData} />
          </div>
        </div>
      </div>
    
  );
};

export default Meditation;