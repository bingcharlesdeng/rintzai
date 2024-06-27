import React, { useState } from 'react';
import './GoalMilestones.css';

const GoalMilestones = ({ goal, onUpdateGoal }) => {
  const [newMilestone, setNewMilestone] = useState('');

  const handleAddMilestone = () => {
    if (newMilestone.trim()) {
      const updatedMilestones = [...(goal.milestones || []), { title: newMilestone, completed: false }];
      onUpdateGoal(goal.id, { ...goal, milestones: updatedMilestones });
      setNewMilestone('');
    }
  };

  const toggleMilestone = (index) => {
    const updatedMilestones = goal.milestones.map((milestone, i) => 
      i === index ? { ...milestone, completed: !milestone.completed } : milestone
    );
    onUpdateGoal(goal.id, { ...goal, milestones: updatedMilestones });
  };

  return (
    <div className="goal-milestones">
      <h4>Milestones</h4>
      <ul>
        {goal.milestones && goal.milestones.map((milestone, index) => (
          <li key={index} className={milestone.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={milestone.completed}
              onChange={() => toggleMilestone(index)}
            />
            <span>{milestone.title}</span>
          </li>
        ))}
      </ul>
      <div className="add-milestone">
        <input
          type="text"
          value={newMilestone}
          onChange={(e) => setNewMilestone(e.target.value)}
          placeholder="New milestone"
        />
        <button onClick={handleAddMilestone}>Add</button>
      </div>
    </div>
  );
};

export default GoalMilestones;