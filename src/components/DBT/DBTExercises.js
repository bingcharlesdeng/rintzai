import React, { useState } from 'react';
import './DBTExercises.css';

const exercises = [
  {
    id: 1,
    title: 'Mindful Breathing',
    description: 'Practice focusing on your breath for 5 minutes.',
    module: 'Mindfulness'
  },
  {
    id: 2,
    title: 'STOP Skill Practice',
    description: 'Use the STOP skill in a stressful situation today.',
    module: 'Distress Tolerance'
  },
  {
    id: 3,
    title: 'Emotion Identification',
    description: 'Identify and label your emotions throughout the day.',
    module: 'Emotion Regulation'
  },
  {
    id: 4,
    title: 'DEAR MAN Role Play',
    description: 'Practice using DEAR MAN in a hypothetical scenario.',
    module: 'Interpersonal Effectiveness'
  }
];

const DBTExercises = ({ dbtData, onDataUpdate }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleExerciseComplete = (exerciseId) => {
    const updatedExercises = [...dbtData.completedExercises, exerciseId];
    onDataUpdate({ completedExercises: updatedExercises });
  };

  return (
    <div className="dbt-exercises">
      <h2>DBT Exercises</h2>
      <div className="exercise-list">
        {exercises.map(exercise => (
          <div key={exercise.id} className="exercise-item">
            <h3>{exercise.title}</h3>
            <p>{exercise.description}</p>
            <p>Module: {exercise.module}</p>
            <button onClick={() => setSelectedExercise(exercise)}>Start Exercise</button>
            {dbtData.completedExercises.includes(exercise.id) && <span className="completed">Completed</span>}
          </div>
        ))}
      </div>
      {selectedExercise && (
        <div className="exercise-details">
          <h3>{selectedExercise.title}</h3>
          <p>{selectedExercise.description}</p>
          <button onClick={() => handleExerciseComplete(selectedExercise.id)}>Mark as Complete</button>
        </div>
      )}
    </div>
  );
};

export default DBTExercises;