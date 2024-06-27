import React, { useState, useEffect } from 'react';
import './MeditationTimer.css';

const MeditationTimer = () => {
  const [duration, setDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setShowNotification(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    setTimeLeft(duration * 60);
    setShowNotification(false);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
    setShowNotification(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="meditation-timer">
      <h2>Meditation Timer</h2>
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="timer-controls">
        <input 
          type="range" 
          min="1" 
          max="60" 
          value={duration} 
          onChange={(e) => setDuration(parseInt(e.target.value))} 
        />
        <span>{duration} minutes</span>
        {!isActive ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handlePause}>Pause</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
      {showNotification && (
        <div className="timer-notification">
          Meditation session complete!
        </div>
      )}
    </div>
  );
};

export default MeditationTimer;