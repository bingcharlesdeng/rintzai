import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import Navbar from '../routes/Navbar';
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
        <div className="left-column">
          <WelcomeMessage user={user} />
          {showMoodCheck && <MoodCheck onComplete={handleMoodCheckComplete} />}
          <FeatureSection />
          <ProgressChart />
        </div>
        <div className="right-column">
          <StreakCounter />
          <DailyChallenge />
          <ActivityFeed />
          <QuoteSection />
        </div>
      </main>
    </div>
  );
};

export default Home;