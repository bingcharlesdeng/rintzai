import React, { useState } from 'react';
import './GoalReflection.css';

const GoalReflection = ({ goal, onUpdateGoal }) => {
  const [reflection, setReflection] = useState(goal.reflection || '');

  const handleReflectionChange = (e) => {
    setReflection(e.target.value);
  };

  const handleReflectionSubmit = () => {
    onUpdateGoal(goal.id, { ...goal, reflection });
  };

  return (
    <div className="goal-reflection">
      <h4>Reflection</h4>
      <textarea
        value={reflection}
        onChange={handleReflectionChange}
        placeholder="Reflect on your progress..."
      />
      <button onClick={handleReflectionSubmit}>Save Reflection</button>
    </div>
  );
};

export default GoalReflection;