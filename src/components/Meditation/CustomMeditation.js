import React, { useState } from 'react';
import './CustomMeditation.css';

const CustomMeditation = () => {
  const [duration, setDuration] = useState(10);
  const [focus, setFocus] = useState('breath');
  const [background, setBackground] = useState('nature');

  const handleStartCustomMeditation = () => {
    // Here you would typically start a custom meditation session
    console.log('Starting custom meditation:', { duration, focus, background });
  };

  return (
    <div className="custom-meditation">
      <h2>Create Custom Meditation</h2>
      <div className="custom-setting">
        <label htmlFor="duration">Duration (minutes)</label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          min="1"
          max="60"
        />
      </div>
      <div className="custom-setting">
        <label htmlFor="focus">Focus</label>
        <select
          id="focus"
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
        >
          <option value="breath">Breath Awareness</option>
          <option value="body-scan">Body Scan</option>
          <option value="loving-kindness">Loving-Kindness</option>
          <option value="visualization">Visualization</option>
        </select>
      </div>
      <div className="custom-setting">
        <label htmlFor="background">Background Sound</label>
        <select
          id="background"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        >
          <option value="nature">Nature Sounds</option>
          <option value="rain">Rain</option>
          <option value="ocean">Ocean Waves</option>
          <option value="white-noise">White Noise</option>
          <option value="none">No Background Sound</option>
        </select>
      </div>
      <button onClick={handleStartCustomMeditation}>Start Custom Meditation</button>
    </div>
  );
};

export default CustomMeditation;