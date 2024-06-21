import React, { useState } from 'react';
import './milestones.css';

const Milestones = ({ milestones, onProfileUpdate }) => {
  const [newMilestone, setNewMilestone] = useState({ title: '', date: '' });

  const handleAddMilestone = () => {
    if (newMilestone.title && newMilestone.date) {
      const updatedMilestones = [
        { id: Date.now(), ...newMilestone },
        ...(milestones || [])
      ];
      onProfileUpdate({ milestones: updatedMilestones });
      setNewMilestone({ title: '', date: '' });
    }
  };

  return (
    <div className="milestones">
      <h2>My Milestones</h2>
      <div className="add-milestone">
        <input
          type="text"
          value={newMilestone.title}
          onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
          placeholder="Milestone title"
        />
        <input
          type="date"
          value={newMilestone.date}
          onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
        />
        <button onClick={handleAddMilestone}>Add Milestone</button>
      </div>
      {milestones && milestones.length > 0 ? (
        <ul className="milestones-list">
          {milestones.map((milestone) => (
            <li key={milestone.id} className="milestone-item">
              <div className="milestone-icon">{/* Add appropriate icon */}</div>
              <div className="milestone-info">
                <h3>{milestone.title}</h3>
                <span className="milestone-date">{milestone.date}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No milestones recorded yet. Celebrate your progress by adding milestones!</p>
      )}
    </div>
  );
};

export default Milestones;