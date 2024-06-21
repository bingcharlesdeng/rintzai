import React from 'react';
import './gratitudeEducation.css';

const GratitudeEducation = () => {
  return (
    <div className="gratitude-education-container">
      <h2 className="gratitude-education-title">Understanding Gratitude</h2>
      <p className="gratitude-education-text">
        Gratitude is the practice of acknowledging and appreciating the good things in your life. It
        involves focusing on the positive aspects of your experiences and expressing thankfulness
        for them. Cultivating gratitude has been shown to have numerous benefits for mental health
        and overall well-being.
      </p>
      <ul className="gratitude-benefits-list">
        <li>Increases happiness and positive emotions</li>
        <li>Reduces stress and anxiety</li>
        <li>Improves relationships and social connections</li>
        <li>Enhances resilience and coping skills</li>
        <li>Boosts self-esteem and self-worth</li>
      </ul>
    </div>
  );
};

export default GratitudeEducation;