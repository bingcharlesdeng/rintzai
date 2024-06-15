import React from 'react';
import './display.css';

const Display = ({ user }) => {
  return (
    <div className="display">
      <div className="display-header">
        <img src={user?.avatarUrl} alt="User Avatar" className="display-avatar" />
        <div className="display-user-info">
          <h2 className="display-name">{user?.name}</h2>
          <p className="display-bio">{user?.bio}</p>
        </div>
      </div>
      <div className="display-stats">
        <div className="stat-item">
          <span className="stat-count">{user?.journalEntries || 0}</span>
          <span className="stat-label">Journal Entries</span>
        </div>
        <div className="stat-item">
          <span className="stat-count">{user?.moodTrackerEntries || 0}</span>
          <span className="stat-label">Mood Tracker Entries</span>
        </div>
        <div className="stat-item">
          <span className="stat-count">{user?.gratitudePosts || 0}</span>
          <span className="stat-label">Gratitude Posts</span>
        </div>
      </div>
      <div className="display-section">
        <h3 className="section-title">Interests</h3>
        <ul className="interests-list">
          {user?.interests?.map((interest, index) => (
            <li key={index} className="interest-item">
              {interest}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Display.defaultProps = {
  user: {
    avatarUrl: 'default-avatar.jpg',
    name: 'Unknown User',
    bio: '',
    journalEntries: 0,
    moodTrackerEntries: 0,
    gratitudePosts: 0,
    interests: [],
  },
};

export default Display;