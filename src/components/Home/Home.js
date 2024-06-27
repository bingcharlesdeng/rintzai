import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import Navbar from '../Routes/Navbar';
import WelcomeMessage from '../WelcomeMessage';
import FeatureSection from './FeatureSection';
import QuoteSection from '../Quotes/QuoteSection';
import MoodCheck from './MoodCheck';
import ActivityFeed from './ActivityFeed';
import StreakCounter from './StreakCounter';
import DailyChallenge from './DailyChallenge';
import ProgressChart from './ProgressChart';
import './home.css';

const Home = () => {
  const { user } = useUserContext();
  const [showMoodCheck, setShowMoodCheck] = useState(true);

  useEffect(() => {
    const lastMoodCheck = localStorage.getItem('lastMoodCheck');
    if (lastMoodCheck && new Date(lastMoodCheck).toDateString() === new Date().toDateString()) {
      setShowMoodCheck(false);
    }
  }, []);

  const handleMoodCheckComplete = () => {
    setShowMoodCheck(false);
    localStorage.setItem('lastMoodCheck', new Date().toISOString());
  };

  return (
    <div className="home-container">
      <Navbar />
      <main className="content">
        <div className="main-column">
          <WelcomeMessage user={user} />
          {showMoodCheck && <MoodCheck onComplete={handleMoodCheckComplete} />}
          <div className="dashboard-grid">
            <div className="dashboard-item wide">
              <FeatureSection />
            </div>
            <div className="dashboard-item">
              <StreakCounter />
            </div>
            <div className="dashboard-item">
              <DailyChallenge />
            </div>
            <div className="dashboard-item wide">
              <ProgressChart />
            </div>
            <div className="dashboard-item">
              <ActivityFeed />
            </div>
            <div className="dashboard-item">
              <QuoteSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;