import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import DBTSkills from './DBTSkills';
import DBTDiaryCard from './DBTDiaryCard';
import DBTExercises from './DBTExercises';
import DBTProgress from './DBTProgress';
import DBTResources from './DBTResources';
import { fetchUserDBTData, updateUserDBTData } from './dbtService';
import './DBT.css';
import Navbar from '../Routes/Navbar';

const DBT = () => {
  const { user } = useUserContext();
  const [dbtData, setDBTData] = useState(null);
  const [activeComponent, setActiveComponent] = useState('Skills');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDBTData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const data = await fetchUserDBTData(user.uid);
          setDBTData(data);
        }
      } catch (error) {
        console.error('Error loading DBT data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDBTData();
  }, [user]);

  const handleDataUpdate = async (newData) => {
    try {
      await updateUserDBTData(user.uid, newData);
      setDBTData(prevData => ({ ...prevData, ...newData }));
    } catch (error) {
      console.error('Error updating DBT data:', error);
    }
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'Skills':
        return <DBTSkills dbtData={dbtData} onDataUpdate={handleDataUpdate} />;
      case 'DiaryCard':
        return <DBTDiaryCard dbtData={dbtData} onDataUpdate={handleDataUpdate} />;
      case 'Exercises':
        return <DBTExercises dbtData={dbtData} onDataUpdate={handleDataUpdate} />;
      case 'Progress':
        return <DBTProgress dbtData={dbtData} />;
      case 'Resources':
        return <DBTResources />;
      default:
        return <DBTSkills dbtData={dbtData} onDataUpdate={handleDataUpdate} />;
    }
  };

  if (isLoading) {
    return <div className="loading">Loading DBT data...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="dbt-container">
        <h1>Dialectical Behavior Therapy (DBT)</h1>
        <div className="dbt-content">
          <nav className="dbt-nav">
            <button onClick={() => setActiveComponent('Skills')}>Skills</button>
            <button onClick={() => setActiveComponent('DiaryCard')}>Diary Card</button>
            <button onClick={() => setActiveComponent('Exercises')}>Exercises</button>
            <button onClick={() => setActiveComponent('Progress')}>Progress</button>
            <button onClick={() => setActiveComponent('Resources')}>Resources</button>
          </nav>
          <main className="dbt-main">
            {renderActiveComponent()}
          </main>
        </div>
      </div>
    </>
  );
};

export default DBT;