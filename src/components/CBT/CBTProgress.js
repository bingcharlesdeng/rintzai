import React from 'react';
import { Line } from 'react-chartjs-2';
import './CBTProgress.css';

const CBTProgress = ({ userData }) => {
  const moodData = userData.moodEntries || [];

  const chartData = {
    labels: moodData.map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood Score',
        data: moodData.map(entry => entry.score),
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
        max: 10,
      },
    },
  };

  return (
    <div className="cbt-progress">
      <h2>Your CBT Progress</h2>
      <div className="progress-stats">
        <div className="stat">
          <h3>Total Thought Records</h3>
          <p>{userData.thoughtRecords ? userData.thoughtRecords.length : 0}</p>
        </div>
        <div className="stat">
          <h3>Total Belief Challenges</h3>
          <p>{userData.beliefChallenges ? userData.beliefChallenges.length : 0}</p>
        </div>
        <div className="stat">
          <h3>Total Exercise Entries</h3>
          <p>{userData.exerciseEntries ? userData.exerciseEntries.length : 0}</p>
        </div>
      </div>
      <div className="mood-chart">
        <h3>Mood Progress</h3>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CBTProgress;