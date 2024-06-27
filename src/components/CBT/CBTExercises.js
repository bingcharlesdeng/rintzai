import React, { useState } from 'react';
import './CBTExercises.css';

const exercises = [
  {
    title: 'Positive Self-Talk',
    description: 'Practice replacing negative self-talk with positive affirmations.',
    steps: [
      'Identify a negative thought you often have about yourself.',
      'Write down this thought.',
      'Now, think of a positive alternative to this thought.',
      'Write down the positive alternative.',
      'Practice saying the positive alternative out loud to yourself.',
    ],
  },
  {
    title: 'Gratitude Journal',
    description: 'Focus on the positive aspects of your life to improve overall mood.',
    steps: [
      "Each day, write down three things you're grateful for.",
      'They can be big or small things.',
      "Try to be specific and reflect on why you're grateful for each item.",
      'Review your list at the end of each week.',
    ],
  },
  {
    title: 'Behavioral Activation',
    description: 'Engage in activities that bring you joy or a sense of accomplishment.',
    steps: [
      'Make a list of activities you enjoy or that give you a sense of achievement.',
      'Schedule at least one of these activities each day.',
      'After completing the activity, rate your mood before and after.',
      'Reflect on how the activity impacted your mood.',
    ],
  },
];

const CBTExercises = ({ userData, onDataUpdate }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseNotes, setExerciseNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedExercise) {
      const newExerciseEntry = {
        exercise: selectedExercise.title,
        notes: exerciseNotes,
        date: new Date().toISOString(),
      };
      onDataUpdate({ exerciseEntries: [...(userData.exerciseEntries || []), newExerciseEntry] });
      // Reset form
      setSelectedExercise(null);
      setExerciseNotes('');
    }
  };

  return (
    <div className="cbt-exercises">
      <h2>CBT Exercises</h2>
      <div className="exercises-list">
        {exercises.map((exercise, index) => (
          <div key={index} className="exercise-item" onClick={() => setSelectedExercise(exercise)}>
            <h3>{exercise.title}</h3>
            <p>{exercise.description}</p>
          </div>
        ))}
      </div>
      {selectedExercise && (
        <div className="selected-exercise">
          <h3>{selectedExercise.title}</h3>
          <p>{selectedExercise.description}</p>
          <ol>
            {selectedExercise.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exerciseNotes">Your Notes:</label>
              <textarea
                id="exerciseNotes"
                value={exerciseNotes}
                onChange={(e) => setExerciseNotes(e.target.value)}
                required
              />
            </div>
            <button type="submit">Save Exercise Entry</button>
          </form>
        </div>
      )}
      <div className="exercise-history">
        <h3>Your Exercise History</h3>
        {userData.exerciseEntries && userData.exerciseEntries.length > 0 ? (
          userData.exerciseEntries.map((entry, index) => (
            <div key={index} className="exercise-entry">
              <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
              <p><strong>Exercise:</strong> {entry.exercise}</p>
              <p><strong>Notes:</strong> {entry.notes}</p>
            </div>
          ))
        ) : (
          <p>No exercise entries recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default CBTExercises;