import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import ThoughtRecord from './ThoughtRecord';
import CognitiveDistortions from './CognitiveDistortions';
import BeliefChallenger from './BeliefChallenger';
import CBTExercises from './CBTExercises';
import CBTProgress from './CBTProgress';
import CBTResources from './CBTResources';
import { fetchUserCBTData, updateUserCBTData } from './cbtService';
import './CBT.css';
import Navbar from '../Routes/Navbar';

const CBT = () => {
  const { user } = useUserContext();
  const [userCBTData, setUserCBTData] = useState(null);
  const [activeComponent, setActiveComponent] = useState('ThoughtRecord');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCBTData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const data = await fetchUserCBTData(user.uid);
          setUserCBTData(data);
        }
      } catch (error) {
        console.error('Error loading CBT data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCBTData();
  }, [user]);

  const handleDataUpdate = async (newData) => {
    try {
      await updateUserCBTData(user.uid, newData);
      setUserCBTData(prevData => ({ ...prevData, ...newData }));
    } catch (error) {
      console.error('Error updating CBT data:', error);
    }
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'ThoughtRecord':
        return <ThoughtRecord userData={userCBTData} onDataUpdate={handleDataUpdate} />;
      case 'CognitiveDistortions':
        return <CognitiveDistortions userData={userCBTData} onDataUpdate={handleDataUpdate} />;
      case 'BeliefChallenger':
        return <BeliefChallenger userData={userCBTData} onDataUpdate={handleDataUpdate} />;
      case 'CBTExercises':
        return <CBTExercises userData={userCBTData} onDataUpdate={handleDataUpdate} />;
      case 'CBTProgress':
        return <CBTProgress userData={userCBTData} />;
      case 'CBTResources':
        return <CBTResources />;
      default:
        return <ThoughtRecord userData={userCBTData} onDataUpdate={handleDataUpdate} />;
    }
  };

  if (isLoading) {
    return <div className="loading">Loading CBT data...</div>;
  }

  return (
    <>
      
      <div className="cbt-container">
        <h1>Cognitive Behavioral Therapy Tools</h1>
        <div className="cbt-content">
          <nav className="cbt-nav">
            <button onClick={() => setActiveComponent('ThoughtRecord')}>Thought Record</button>
            <button onClick={() => setActiveComponent('CognitiveDistortions')}>Cognitive Distortions</button>
            <button onClick={() => setActiveComponent('BeliefChallenger')}>Belief Challenger</button>
            <button onClick={() => setActiveComponent('CBTExercises')}>CBT Exercises</button>
            <button onClick={() => setActiveComponent('CBTProgress')}>Progress</button>
            <button onClick={() => setActiveComponent('CBTResources')}>Resources</button>
          </nav>
          <main className="cbt-main">
            {renderActiveComponent()}
          </main>
        </div>
      </div>
      </>
    
  );
};

export default CBT;