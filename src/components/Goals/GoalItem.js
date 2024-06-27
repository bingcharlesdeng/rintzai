import React, { useState } from 'react';
import GoalProgress from './GoalProgress';
import GoalReflection from './GoalReflection';
import GoalMilestones from './GoalMilestones';
import './GoalItem.css';

const GoalItem = ({ goal, onUpdateGoal, onDeleteGoal, onShareGoal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState(goal);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateGoal(goal.id, editedGoal);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal({ ...editedGoal, [name]: value });
  };

  return (
    <div className="goal-item">
      {isEditing ? (
        <div className="goal-edit-form">
          <input
            type="text"
            name="title"
            value={editedGoal.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={editedGoal.description}
            onChange={handleChange}
          />
          <input
            type="date"
            name="deadline"
            value={editedGoal.deadline}
            onChange={handleChange}
          />
          <select
            name="category"
            value={editedGoal.category}
            onChange={handleChange}
          >
            <option value="Personal">Personal</option>
            <option value="Professional">Professional</option>
            <option value="Health">Health</option>
            <option value="Financial">Financial</option>
          </select>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <>
          <h3>{goal.title}</h3>
          <p>{goal.description}</p>
          <p>Deadline: {goal.deadline}</p>
          <p>Category: {goal.category}</p>
          <GoalProgress goal={goal} onUpdateGoal={onUpdateGoal} />
          <GoalMilestones goal={goal} onUpdateGoal={onUpdateGoal} />
          <GoalReflection goal={goal} onUpdateGoal={onUpdateGoal} />
          <div className="goal-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => onDeleteGoal(goal.id)}>Delete</button>
            <button onClick={() => onShareGoal(goal)}>Share</button>
          </div>
        </>
      )}
    </div>
  );
};

export default GoalItem;