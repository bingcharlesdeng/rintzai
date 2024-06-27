import React from 'react';
import GoalItem from './GoalItem';
import './GoalList.css';

const GoalList = ({ goals, onUpdateGoal, onDeleteGoal, onShareGoal }) => {
  return (
    <div className="goal-list">
      <h2>Your Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet. Start by adding a new goal!</p>
      ) : (
        goals.map(goal => (
          <GoalItem 
            key={goal.id} 
            goal={goal} 
            onUpdateGoal={onUpdateGoal} 
            onDeleteGoal={onDeleteGoal}
            onShareGoal={onShareGoal}
          />
        ))
      )}
    </div>
  );
};

export default GoalList;