import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import OverallProgress from './OverallProgress';
import MoodAnalysis from './MoodAnalysis';
import HabitTracker from './HabitTracker';
import JournalInsights from './JournalInsights';
import GoalProgress from './GoalProgress';
import TherapyProgress from './TherapyProgress';
import CustomMetrics from './CustomMetrics';
import MentalHealthIndex from './MentalHealthIndex';
import { fetchUserProgressData, analyzeProgressData } from './progressService';
import './Progress.css';
import Navbar from '../Routes/Navbar';

const Progress = () => {
  const { user } = useUserContext();
  const [progressData, setProgressData] = useState(null);
  const [activeComponent, setActiveComponent] = useState('OverallProgress');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProgressData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          console.log('Fetching progress data for user:', user.uid);
          const rawData = await fetchUserProgressData(user.uid);
          console.log('Raw progress data:', rawData);
          const analyzedData = analyzeProgressData(rawData);
          console.log('Analyzed progress data:', analyzedData);
          setProgressData(analyzedData);
        }
      } catch (error) {
        console.error('Error loading progress data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgressData();
  }, [user]);

  const renderActiveComponent = () => {
    console.log('Rendering active component:', activeComponent);
    switch (activeComponent) {
      case 'OverallProgress':
        return <OverallProgress data={progressData} />;
      case 'MoodAnalysis':
        return <MoodAnalysis data={progressData} />;
      case 'HabitTracker':
        return <HabitTracker data={progressData} />;
      case 'JournalInsights':
        return <JournalInsights data={progressData} />;
      case 'GoalProgress':
        return <GoalProgress data={progressData} />;
      case 'TherapyProgress':
        return <TherapyProgress data={progressData} />;
      case 'CustomMetrics':
        return <CustomMetrics data={progressData} />;
      case 'MentalHealthIndex':
        return <MentalHealthIndex data={progressData} />;
      default:
        console.warn('Unknown active component:', activeComponent);
        return <OverallProgress data={progressData} />;
    }
  };

  if (isLoading) {
    return <div className="loading">Loading progress data...</div>;
  }

  return (
      
      <div className="progress-container">
        <h1>Your Mental Health Progress</h1>
        <div className="progress-content">
          <nav className="progress-nav">
            <button onClick={() => setActiveComponent('OverallProgress')}>Overall Progress</button>
            <button onClick={() => setActiveComponent('MoodAnalysis')}>Mood Analysis</button>
            <button onClick={() => setActiveComponent('HabitTracker')}>Habit Tracker</button>
            <button onClick={() => setActiveComponent('JournalInsights')}>Journal Insights</button>
            <button onClick={() => setActiveComponent('GoalProgress')}>Goal Progress</button>
            <button onClick={() => setActiveComponent('TherapyProgress')}>Therapy Progress</button>
            <button onClick={() => setActiveComponent('CustomMetrics')}>Custom Metrics</button>
            <button onClick={() => setActiveComponent('MentalHealthIndex')}>Mental Health Index</button>
          </nav>
          <main className="progress-main">
            {renderActiveComponent()}
          </main>
        </div>
      </div>
    
  );
};

export default Progress;