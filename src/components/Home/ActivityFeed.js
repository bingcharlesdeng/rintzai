import React from 'react';
import './activityFeed.css';

const ActivityFeed = () => {
  const activities = [
    { user: 'Jane', action: 'completed a journal entry', time: '5 minutes ago', icon: '📝' },
    { user: 'John', action: 'achieved a 7-day streak', time: '1 hour ago', icon: '🔥' },
    { user: 'Emma', action: 'shared a motivational quote', time: '2 hours ago', icon: '💬' },
    { user: 'Mike', action: 'improved their mood', time: '3 hours ago', icon: '😊' },
  ];

  return (
    <div className="activity-feed">
      <h3>Community Activity</h3>
      <ul>
        {activities.map((activity, index) => (
          <li key={index} className="activity-item">
            <span className="activity-icon">{activity.icon}</span>
            <div className="activity-content">
              <span className="activity-user">{activity.user}</span>
              <span className="activity-action">{activity.action}</span>
              <span className="activity-time">{activity.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;