import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './GoalVisualization.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GoalVisualization = ({ goals, moodData }) => {
  const data = {
    labels: goals.map(goal => goal.title),
    datasets: [
      {
        label: 'Goal Progress',
        data: goals.map(goal => goal.progress),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        yAxisID: 'y',
      },
      {
        label: 'Average Mood',
        data: goals.map(goal => {
          const relevantMoodData = moodData.filter(mood => {
            const moodDate = new Date(mood.date);
            const goalStartDate = new Date(goal.createdAt);
            const goalEndDate = new Date(goal.deadline);
            return moodDate >= goalStartDate && moodDate <= goalEndDate;
          });
          if (relevantMoodData.length === 0) return null;
          const sum = relevantMoodData.reduce((acc, mood) => acc + mood.score, 0);
          return sum / relevantMoodData.length;
        }),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Goal Progress (%)',
        },
        beginAtZero: true,
        max: 100,
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Average Mood (1-10)',
        },
        beginAtZero: true,
        max: 10,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="goal-visualization">
      <h3>Goal Progress and Mood Visualization</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default GoalVisualization;