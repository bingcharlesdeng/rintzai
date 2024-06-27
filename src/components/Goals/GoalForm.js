import React, { useState } from 'react';
import './GoalForm.css';

const GoalForm = ({ onAddGoal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('Personal');
  const [milestones, setMilestones] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddGoal({ 
      title, 
      description, 
      deadline, 
      category, 
      milestones,
      progress: 0, 
      createdAt: new Date() 
    });
    resetForm();
  };

  const addMilestone = () => {
    setMilestones([...milestones, { title: '', completed: false }]);
  };

  const updateMilestone = (index, title) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index].title = title;
    setMilestones(updatedMilestones);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
    setCategory('Personal');
    setMilestones([]);
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Goal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Goal Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Personal">Personal</option>
        <option value="Professional">Professional</option>
        <option value="Health">Health</option>
        <option value="Financial">Financial</option>
      </select>
      <div className="milestones-section">
        <h3>Milestones</h3>
        {milestones.map((milestone, index) => (
          <input
            key={index}
            type="text"
            placeholder="Milestone title"
            value={milestone.title}
            onChange={(e) => updateMilestone(index, e.target.value)}
          />
        ))}
        <button type="button" onClick={addMilestone}>Add Milestone</button>
      </div>
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default GoalForm;