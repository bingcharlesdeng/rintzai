import React, { useState } from 'react';
import './MeditationSettings.css';

const MeditationSettings = ({ userData }) => {
  const [dailyGoal, setDailyGoal] = useState(userData ? userData.dailyGoal : 10);
  const [reminderTime, setReminderTime] = useState(userData ? userData.reminderTime : '09:00');
  const [backgroundSound, setBackgroundSound] = useState(userData ? userData.backgroundSound : 'nature');

  const handleSaveSettings = () => {
    // Here you would typically update these settings in your backend
    console.log('Saving settings:', { dailyGoal, reminderTime, backgroundSound });
  };

  return (
    <div className="meditation-settings">
      <h2>Meditation Settings</h2>
      <div className="setting">
        <label htmlFor="dailyGoal">Daily Meditation Goal (minutes)</label>
        <input
          type="number"
          id="dailyGoal"
          value={dailyGoal}
          onChange={(e) => setDailyGoal(parseInt(e.target.value))}
          min="1"
          max="120"
        />
      </div>
      <div className="setting">
        <label htmlFor="reminderTime">Daily Reminder Time</label>
        <input
          type="time"
          id="reminderTime"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
        />
      </div>
      <div className="setting">
        <label htmlFor="backgroundSound">Background Sound</label>
        <select
          id="backgroundSound"
          value={backgroundSound}
          onChange={(e) => setBackgroundSound(e.target.value)}
        >
          <option value="nature">Nature Sounds</option>
          <option value="rain">Rain</option>
          <option value="ocean">Ocean Waves</option>
          <option value="white-noise">White Noise</option>
          <option value="none">No Background Sound</option>
        </select>
      </div>
      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};

export default MeditationSettings;