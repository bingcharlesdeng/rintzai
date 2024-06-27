// /src/components/Mental/PersonalizedDashboard.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import './PersonalizedDashboard.css';

const PersonalizedDashboard = ({ userData, updateUserData }) => {
  const renderMoodChart = () => {
    const moodData = userData.moodEntries || [];
    const data = {
      labels: moodData.map(entry => new Date(entry.date).toLocaleDateString()),
      datasets: [{
        label: 'Mood',
        data: moodData.map(entry => entry.score),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    return (
      <div className="mood-chart">
        <h3>Mood Tracker</h3>
        <Line data={data} />
      </div>
    );
  };

  const renderGoals = () => {
    return (
      <div className="goals-section">
        <h3>My Goals</h3>
        {userData.goals && userData.goals.length > 0 ? (
          <ul>
            {userData.goals.map((goal, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => {
                    const updatedGoals = [...userData.goals];
                    updatedGoals[index].completed = !updatedGoals[index].completed;
                    updateUserData({ goals: updatedGoals });
                  }}
                />
                {goal.text}
              </li>
            ))}
          </ul>
        ) : (
          <p>No goals set. Add some goals to track your progress!</p>
        )}
        <button onClick={() => {/* Open goal creation modal */}}>Add New Goal</button>
      </div>
    );
  };

  return (
    <div className="personalized-dashboard">
      <h2>My Mental Health Dashboard</h2>
      {renderMoodChart()}
      {renderGoals()}
      <div className="coping-strategies-summary">
        <h3>My Coping Strategies</h3>
        {userData.copingStrategies && userData.copingStrategies.length > 0 ? (
          <ul>
            {userData.copingStrategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
        ) : (
          <p>No coping strategies added yet. Visit the Coping Strategies section to add some!</p>
        )}
      </div>
      <div className="next-steps">
        <h3>Recommended Next Steps</h3>
        <ul>
          <li>Complete your daily mood check-in</li>
          <li>Practice a coping strategy from your list</li>
          <li>Read an article about stress management</li>
          <li>Connect with a support group</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalizedDashboard;