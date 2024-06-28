import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import SupportGroups from './SupportGroups';
import PeerConnections from './PeerConnections';
import SharedExperiences from './SharedExperiences';
import SupportChat from './SupportChat';
import SocialProfile from './SocialProfile';
import { fetchUserSocialData, updateUserSocialData } from './socialService';
import './Social.css';
import Navbar from '../Routes/Navbar';

const Social = () => {
  const { user } = useUserContext();
  const [userSocialData, setUserSocialData] = useState(null);
  const [activeComponent, setActiveComponent] = useState('SupportGroups');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSocialData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const data = await fetchUserSocialData(user.uid);
          setUserSocialData(data);
        }
      } catch (error) {
        console.error('Error loading social data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSocialData();
  }, [user]);

  const handleDataUpdate = async (newData) => {
    try {
      await updateUserSocialData(user.uid, newData);
      setUserSocialData(prevData => ({ ...prevData, ...newData }));
    } catch (error) {
      console.error('Error updating social data:', error);
    }
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'SupportGroups':
        return <SupportGroups userData={userSocialData} onDataUpdate={handleDataUpdate} />;
      case 'PeerConnections':
        return <PeerConnections userData={userSocialData} onDataUpdate={handleDataUpdate} />;
      case 'SharedExperiences':
        return <SharedExperiences userData={userSocialData} onDataUpdate={handleDataUpdate} />;
      case 'SupportChat':
        return <SupportChat userData={userSocialData} onDataUpdate={handleDataUpdate} />;
      case 'SocialProfile':
        return <SocialProfile userData={userSocialData} onDataUpdate={handleDataUpdate} />;
      default:
        return <SupportGroups userData={userSocialData} onDataUpdate={handleDataUpdate} />;
    }
  };

  if (isLoading) {
    return <div className="loading">Loading social support network data...</div>;
  }

  return (

      
      <div className="social-container">
        <h1>Social Support Network</h1>
        <div className="social-content">
          <nav className="social-nav">
            <button onClick={() => setActiveComponent('SupportGroups')}>Support Groups</button>
            <button onClick={() => setActiveComponent('PeerConnections')}>Peer Connections</button>
            <button onClick={() => setActiveComponent('SharedExperiences')}>Shared Experiences</button>
            <button onClick={() => setActiveComponent('SupportChat')}>Support Chat</button>
            <button onClick={() => setActiveComponent('SocialProfile')}>Social Profile</button>
          </nav>
          <main className="social-main">
            {renderActiveComponent()}
          </main>
        </div>
      </div>
    
  );
};

export default Social;