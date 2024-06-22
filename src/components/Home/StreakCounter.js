import React, { useState, useEffect } from 'react';
import './streakCounter.css';

const StreakCounter = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedStreak = localStorage.getItem('streak');
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const today = new Date().toDateString();

    if (lastLoginDate === today) {
      setStreak(parseInt(savedStreak) || 0);
    } else if (lastLoginDate === new Date(Date.now() - 86400000).toDateString()) {
      const newStreak = (parseInt(savedStreak) || 0) + 1;
      setStreak(newStreak);
      localStorage.setItem('streak', newStreak);
      localStorage.setItem('lastLoginDate', today);
    } else {
      setStreak(1);
      localStorage.setItem('streak', 1);
      localStorage.setItem('lastLoginDate', today);
    }
  }, []);

  return (
    <div className="streak-counter">
      <h3>Your Streak</h3>
      <div className="streak-count">{streak}</div>
      <p>days in a row</p>
      <div className="streak-flame">🔥</div>
    </div>
  );
};

export default StreakCounter;