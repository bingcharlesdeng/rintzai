import React, { useState } from 'react';
import './GoalShare.css';

const GoalShare = ({ goal, onClose }) => {
  const [email, setEmail] = useState('');

  const handleShare = () => {
    // Implement sharing functionality (e.g., send an email or notification)
    console.log(`Sharing goal "${goal.title}" with ${email}`);
    onClose();
  };

  return (
    <div className="goal-share-modal">
      <div className="goal-share-content">
        <h2>Share Your Goal</h2>
        <p>Share your goal "{goal.title}" with a friend or support group.</p>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="goal-share-actions">
          <button onClick={handleShare}>Share</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default GoalShare;