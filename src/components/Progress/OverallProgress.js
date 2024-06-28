import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OverallProgress = ({ data }) => {
  console.log('Rendering OverallProgress with data:', data);

  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: 'Overall Well-being',
        data: data.overallWellbeing,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Mood',
        data: data.moodScores,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Anxiety',
        data: data.anxietyScores,
        borderColor: 'rgb(255, 205, 86)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Overall Mental Health Progress'
      }
    }
  };

  return (
    <div className="overall-progress">
      <h2>Overall Progress</h2>
      <Line data={chartData} options={options} />
      <div className="progress-summary">
        <h3>Summary</h3>
        <p>Your overall well-being has {data.wellbeingTrend} by {data.wellbeingChange}% in the last 30 days.</p>
        <p>Your mood stability has {data.moodStabilityTrend} by {data.moodStabilityChange}%.</p>
        <p>Your anxiety levels have {data.anxietyTrend} by {data.anxietyChange}%.</p>
        <p>Resilience Score: {data.resilienceScore} out of 10</p>
        <p>Mental Health Index: {data.mentalHealthIndex} out of 100</p>
      </div>
    </div>
  );
};

export default OverallProgress;