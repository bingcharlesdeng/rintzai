import React from 'react';
import { Pie } from 'react-chartjs-2';
import './MeditationInsights.css';

const MeditationInsights = ({ userData }) => {
  const categoryData = userData ? {
    labels: Object.keys(userData.categoryBreakdown),
    datasets: [
      {
        data: Object.values(userData.categoryBreakdown),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  } : null;

  return (
    <div className="meditation-insights">
      <h2>Meditation Insights</h2>
      {userData ? (
        <>
          <div className="insight-stat">
            <h3>Most Frequent Time</h3>
            <p>{userData.mostFrequentTime}</p>
          </div>
          <div className="insight-stat">
            <h3>Favorite Category</h3>
            <p>{userData.favoriteCategory}</p>
          </div>
          <div className="insight-stat">
            <h3>Longest Session</h3>
            <p>{userData.longestSession} minutes</p>
          </div>
          <div className="category-breakdown">
            <h3>Category Breakdown</h3>
            <Pie data={categoryData} />
          </div>
          <div className="insight-recommendations">
            <h3>Recommendations</h3>
            <ul>
              {userData.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        
     </> ) : (
        <p>Meditate more to unlock insights!</p>
      )}
    </div>
  );
};

export default MeditationInsights;