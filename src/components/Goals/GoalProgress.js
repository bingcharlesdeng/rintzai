import React from 'react';
import './GoalProgress.css';

const GoalProgress = ({ goal, onUpdateGoal }) => {
  const handleProgressChange = (e) => {
    const progress = parseInt(e.target.value);
    onUpdateGoal(goal.id, { ...goal, progress });
  };

  return (
    <div className="goal-progress">
      <label htmlFor={`progress-${goal.id}`}>Progress: {goal.progress}%</label>
      <input
        id={`progress-${goal.id}`}
        type="range"
        min="0"
        max="100"
        value={goal.progress}
        onChange={handleProgressChange}
      />
    </div>
  );
};

export default GoalProgress;