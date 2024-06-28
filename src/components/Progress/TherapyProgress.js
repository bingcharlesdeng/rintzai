import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TherapyProgress = ({ data }) => {
  console.log('Rendering TherapyProgress with data:', data);

  const chartData = {
    labels: data.therapyDates,
    datasets: [
      {
        label: 'Therapy Session Rating',
        data: data.therapyRatings,
        borderColor: 'rgb(75, 192, 192)',
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
        text: 'Therapy Progress Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10
      }
    }
  };

  return (
    <div className="therapy-progress">
      <h2>Therapy Progress</h2>
      <Line data={chartData} options={options} />
      <div className="therapy-insights">
        <h3>Therapy Insights</h3>
        <p>Total sessions: <strong>{data.totalSessions}</strong></p>
        <p>Average session rating: <strong>{data.averageSessionRating.toFixed(1)}</strong></p>
        <p>Most discussed topics:</p>
        <ul>
          {data.topDiscussedTopics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
        <p>Therapist's notes: <strong>{data.therapistNotes}</strong></p>
        <p>Progress trend: {data.therapyProgressTrend}</p>
        <p>Recommended focus areas: {data.recommendedFocusAreas.join(', ')}</p>
        <p>Therapy engagement score: {data.therapyEngagementScore} out of 10</p>
      </div>
      <div className="therapy-techniques">
        <h3>Effective Techniques</h3>
        <ul>
          {data.effectiveTechniques.map((technique, index) => (
            <li key={index}>{technique}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TherapyProgress;