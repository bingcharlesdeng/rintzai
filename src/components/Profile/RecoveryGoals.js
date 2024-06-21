import React, { useState } from 'react';
import './recoveryGoals.css';

const RecoveryGoals = ({ goals, onProfileUpdate }) => {
  const [newGoal, setNewGoal] = useState({ title: '', description: '', progress: 0 });

  const handleAddGoal = () => {
    if (newGoal.title) {
      const updatedGoals = [
        { id: Date.now(), ...newGoal },
        ...(goals || [])
      ];
      onProfileUpdate({ recoveryGoals: updatedGoals });
      setNewGoal({ title: '', description: '', progress: 0 });
    }
  };

  const handleUpdateProgress = (goalId, newProgress) => {
    const updatedGoals = goals.map(goal => 
      goal.id === goalId ? { ...goal, progress: newProgress } : goal
    );
    onProfileUpdate({ recoveryGoals: updatedGoals });
  };

  return (
    <div className="recovery-goals">
      <h2>My Recovery Goals</h2>
      <div className="add-goal">
        <input
          type="text"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          placeholder="Goal title"
        />
        <textarea
          value={newGoal.description}
          onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
          placeholder="Goal description"
        />
        <button onClick={handleAddGoal}>Add Goal</button>
      </div>
      {goals && goals.length > 0 ? (
        <ul className="goals-list">
          {goals.map((goal) => (
            <li key={goal.id} className="goal-item">
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) => handleUpdateProgress(goal.id, parseInt(e.target.value))}
              />
              <span className="goal-progress">{goal.progress}% Complete</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recovery goals set. Start setting goals to track your progress!</p>
      )}
    </div>
  );
};

export default RecoveryGoals;