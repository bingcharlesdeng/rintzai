import React from 'react';
import './gratitude.css';
import GratitudeList from './GratitudeList';
import GratitudeEducation from './GratitudeEducation';
import GratitudeExercises from './GratitudeExercises';
import GratitudeQuotes from './GratitudeQuotes';
import Navbar from '../Navbar';

const Gratitude = () => {
  return (
    <>
      <Navbar />
      <div className="gratitude-container">
        <h1 className="gratitude-title">Gratitude</h1>
        <p className="gratitude-description">
          Cultivate a grateful mindset and experience the power of gratitude in your life.
        </p>
        <GratitudeList />
        <GratitudeEducation />
        <GratitudeExercises />
        <GratitudeQuotes />
      </div>
    </>
  );
};

export default Gratitude;