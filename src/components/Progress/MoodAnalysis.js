import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MoodAnalysis = ({ data }) => {
  console.log('Rendering MoodAnalysis with data:', data);

  const chartData = {
    labels: Object.keys(data.moodFrequency),
    datasets: [
      {
        label: 'Mood Frequency',
        data: Object.values(data.moodFrequency),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Mood Frequency Analysis'
      }
    }
  };

  return (
    <div className="mood-analysis">
      <h2>Mood Analysis</h2>
      <Bar data={chartData} options={options} />
      <div className="mood-insights">
        <h3>Insights</h3>
        <p>Your most frequent mood: <strong>{data.mostFrequentMood}</strong></p>
        <p>Your mood variability: <strong>{data.moodVariability}</strong></p>
        <p>Mood improvement areas: <strong>{data.moodImprovementAreas.join(', ')}</strong></p>
        <p>Mood patterns: {data.moodPatterns}</p>
        <p>Mood triggers: {data.moodTriggers.join(', ')}</p>
        <p>Emotional intelligence score: {data.emotionalIntelligenceScore} out of 10</p>
      </div>
    </div>
  );
};

export default MoodAnalysis;