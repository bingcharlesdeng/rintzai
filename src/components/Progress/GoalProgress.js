import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GoalProgress = ({ data }) => {
  console.log('Rendering GoalProgress with data:', data);

  const chartData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [data.completedGoals, data.inProgressGoals, data.notStartedGoals],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
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
        text: 'Goal Progress Overview'
      }
    }
  };

  return (
    <div className="goal-progress">
      <h2>Goal Progress</h2>
      <div className="goal-chart">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="goal-insights">
        <h3>Goal Insights</h3>
        <p>Total goals: <strong>{data.totalGoals}</strong></p>
        <p>Completion rate: <strong>{data.goalCompletionRate}%</strong></p>
        <p>Most challenging goal: <strong>{data.mostChallengingGoal}</strong></p>
        <p>Next milestone: <strong>{data.nextMilestone}</strong></p>
        <p>Goal achievement trend: {data.goalAchievementTrend}</p>
        <p>Average time to complete a goal: {data.averageTimeToCompleteGoal} days</p>
        <p>Goal consistency score: {data.goalConsistencyScore} out of 10</p>
        <p>Recommended focus area: {data.recommendedFocusArea}</p>
      </div>
      <div className="goal-breakdown">
        <h3>Goal Breakdown</h3>
        <ul>
          {data.goalCategories.map((category, index) => (
            <li key={index}>
              {category.name}: {category.completionRate}% complete
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GoalProgress;