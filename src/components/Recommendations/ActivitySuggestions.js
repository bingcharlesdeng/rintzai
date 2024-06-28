import React from 'react';
import './ActivitySuggestions.css';

const ActivitySuggestions = ({ data, onFeedback }) => {
  console.log('Rendering ActivitySuggestions with data:', data);

  if (!data || data.length === 0) {
    return <div className="no-activities">No activity suggestions available at the moment.</div>;
  }

  return (
    <div className="activity-suggestions">
      <h2>Suggested Activities for Today</h2>
      <div className="activities-list">
        {data.map((activity) => (
          <div key={activity.id} className="activity-item">
            <h3>{activity.name}</h3>
            <p>{activity.description}</p>
            <div className="activity-details">
              <span>Duration: {activity.duration} minutes</span>
              <span>Mood Impact: {activity.moodImpact}</span>
            </div>
            <button className="start-activity-btn">Start Activity</button>
            <div className="activity-feedback">
              <button onClick={() => onFeedback('activity', activity.id, 'positive')}>👍</button>
              <button onClick={() => onFeedback('activity', activity.id, 'negative')}>👎</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySuggestions;