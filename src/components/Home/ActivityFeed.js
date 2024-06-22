import React from 'react';
import './activityFeed.css';

const ActivityFeed = () => {
  const activities = [
    { user: 'Jane', action: 'completed a journal entry', time: '5 minutes ago' },
    { user: 'John', action: 'achieved a 7-day streak', time: '1 hour ago' },
    { user: 'Emma', action: 'shared a motivational quote', time: '2 hours ago' },
    { user: 'Mike', action: 'improved their mood', time: '3 hours ago' },
  ];

  return (
    <div className="activity-feed">
      <h2>Recent Activity</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index} className="activity-item">
            <span className="activity-user">{activity.user}</span>
            <span className="activity-action">{activity.action}</span>
            <span className="activity-time">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;