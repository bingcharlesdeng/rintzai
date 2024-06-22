import React, { useState, useEffect } from 'react';
import { useUserContext } from '../UserContext';
import Navbar from '../Navbar';
import WelcomeMessage from '../WelcomeMessage';
import FeatureSection from './FeatureSection';
import QuoteSection from '../Quotes/QuoteSection';
import MoodCheck from './MoodCheck';
import ActivityFeed from './ActivityFeed';
import StreakCounter from './StreakCounter';
import './home.css';

const Home = () => {
  const { user, isLoggedIn } = useUserContext();
  const [showMoodCheck, setShowMoodCheck] = useState(true);

  useEffect(() => {
    // Check if user has already done mood check today
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
        <WelcomeMessage user={user} />
        {showMoodCheck && <MoodCheck onComplete={handleMoodCheckComplete} />}
        <StreakCounter />
        <FeatureSection />
        <ActivityFeed />
        <QuoteSection />
      </main>
    </div>
  );
};

export default Home;