import React from 'react';
import { Line } from 'react-chartjs-2';
import './MeditationProgress.css';

const MeditationProgress = ({ userData }) => {
  const chartData = {
    labels: userData ? userData.meditationHistory.map(entry => entry.date) : [],
    datasets: [
      {
        label: 'Minutes Meditated',
        data: userData ? userData.meditationHistory.map(entry => entry.duration) : [],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="meditation-progress">
      <h2>Your Meditation Progress</h2>
      {userData ? (
        <>
          <div className="progress-stats">
            <div className="stat">
              <h3>Total Sessions</h3>
              <p>{userData.totalSessions}</p>
            </div>
            <div className="stat">
              <h3>Total Minutes</h3>
              <p>{userData.totalMinutes}</p>
            </div>
            <div className="stat">
              <h3>Current Streak</h3>
              <p>{userData.currentStreak} days</p>
            </div>
          </div>
          <div className="progress-chart">
            <Line data={chartData} options={options} />
          </div>
        </>
      ) : (
        <p>Start meditating to see your progress!</p>
      )}
    </div>
  );
};

export default MeditationProgress;