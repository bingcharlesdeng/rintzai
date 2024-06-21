import React from 'react';
import './gratitudeExercises.css';

const GratitudeExercises = () => {
  return (
    <div className="gratitude-exercises-container">
      <h2 className="gratitude-exercises-title">Gratitude Exercises</h2>
      <p className="gratitude-exercises-text">
        Try these gratitude exercises to deepen your appreciation and cultivate a grateful mindset:
      </p>
      <ol className="gratitude-exercises-list">
        <li>
          <strong>Gratitude Journal:</strong> Write down three things you are grateful for each day.
          Reflect on why you are thankful for them.
        </li>
        <li>
          <strong>Gratitude Letter:</strong> Write a letter expressing your gratitude to someone who
          has positively impacted your life. Deliver the letter in person, if possible.
        </li>
        <li>
          <strong>Gratitude Meditation:</strong> Take a few minutes each day to sit quietly and
          focus on the things you are grateful for. Visualize and feel the gratitude in your heart.
        </li>
        <li>
          <strong>Gratitude Walk:</strong> Go for a walk and observe the beauty around you. Notice
          the small things you often overlook and express gratitude for them.
        </li>
        <li>
          <strong>Gratitude Jar:</strong> Write down moments of gratitude on slips of paper and
          place them in a jar. Revisit the jar whenever you need a boost of positivity.
        </li>
      </ol>
    </div>
  );
};

export default GratitudeExercises;