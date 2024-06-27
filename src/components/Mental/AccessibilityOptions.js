import React from 'react';
import './AccessibilityOptions.css';

const AccessibilityOptions = ({ userData, updateUserData }) => {
  const preferences = userData?.preferences || {};

  const handleOptionChange = (option, value) => {
    const updatedPreferences = { ...preferences, [option]: value };
    updateUserData({ preferences: updatedPreferences });
  };

  return (
    <div className="accessibility-options">
      <h2>Accessibility Options</h2>
      <div className="option">
        <label htmlFor="fontSize">Font Size</label>
        <select
          id="fontSize"
          value={preferences.fontSize || 'medium'}
          onChange={(e) => handleOptionChange('fontSize', e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="x-large">Extra Large</option>
        </select>
      </div>
      <div className="option">
        <label htmlFor="contrast">High Contrast</label>
        <input
          type="checkbox"
          id="contrast"
          checked={preferences.highContrast || false}
          onChange={(e) => handleOptionChange('highContrast', e.target.checked)}
        />
      </div>
      <div className="option">
        <label htmlFor="reduceMotion">Reduce Motion</label>
        <input
          type="checkbox"
          id="reduceMotion"
          checked={preferences.reduceMotion || false}
          onChange={(e) => handleOptionChange('reduceMotion', e.target.checked)}
        />
      </div>
      <div className="option">
        <label htmlFor="textToSpeech">Text-to-Speech</label>
        <input
          type="checkbox"
          id="textToSpeech"
          checked={preferences.textToSpeech || false}
          onChange={(e) => handleOptionChange('textToSpeech', e.target.checked)}
        />
      </div>
      <div className="option">
        <label htmlFor="language">Language</label>
        <select
          id="language"
          value={preferences.language || 'en'}
          onChange={(e) => handleOptionChange('language', e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="zh">中文</option>
        </select>
      </div>
    </div>
  );
};

export default AccessibilityOptions;