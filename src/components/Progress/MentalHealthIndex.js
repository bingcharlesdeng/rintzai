import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MentalHealthIndex = ({ data }) => {
  console.log('Rendering MentalHealthIndex with data:', data);

  const chartData = {
    labels: ['Mental Health Index', 'Room for Improvement'],
    datasets: [
      {
        data: [data.mentalHealthIndex, 100 - data.mentalHealthIndex],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
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
        text: 'Mental Health Index'
      }
    },
    cutout: '70%',
  };

  const getIndexCategory = (index) => {
    if (index >= 80) return 'Excellent';
    if (index >= 60) return 'Good';
    if (index >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="mental-health-index">
      <h2>Mental Health Index</h2>
      <div className="index-chart">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="index-insights">
        <h3>Index Insights</h3>
        <p>Your Mental Health Index: <strong>{data.mentalHealthIndex}</strong></p>
        <p>Category: <strong>{getIndexCategory(data.mentalHealthIndex)}</strong></p>
        <p>This index is calculated based on your overall well-being, anxiety levels, resilience score, emotional intelligence, and therapy engagement.</p>
        <h4>Component Breakdown:</h4>
        <ul>
          <li>Overall Well-being: {data.overallWellbeing[data.overallWellbeing.length - 1]} / 10</li>
          <li>Anxiety Levels: {10 - data.anxietyScores[data.anxietyScores.length - 1]} / 10 (inverted)</li>
          <li>Resilience Score: {data.resilienceScore} / 10</li>
          <li>Emotional Intelligence: {data.emotionalIntelligenceScore} / 10</li>
          <li>Therapy Engagement: {data.therapyEngagementScore} / 10</li>
        </ul>
        <p>Focus areas for improvement:</p>
        <ul>
          {data.focusAreas.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MentalHealthIndex;