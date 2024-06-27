import React from 'react';
import { Line } from 'react-chartjs-2';
import './DBTProgress.css';

const DBTProgress = ({ dbtData }) => {
  const skillsData = Object.keys(dbtData.completedSkills).map(module => ({
    module,
    completed: dbtData.completedSkills[module].length
  }));

  const chartData = {
    labels: skillsData.map(item => item.module),
    datasets: [
      {
        label: 'Completed Skills',
        data: skillsData.map(item => item.completed),
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
    <div className="dbt-progress">
      <h2>Your DBT Progress</h2>
      <div className="progress-stats">
        <div className="stat">
          <h3>Total Skills Completed</h3>
          <p>{Object.values(dbtData.completedSkills).flat().length}</p>
        </div>
        <div className="stat">
          <h3>Total Exercises Completed</h3>
          <p>{dbtData.completedExercises.length}</p>
        </div>
        <div className="stat">
          <h3>Diary Card Entries</h3>
          <p>{dbtData.diaryEntries.length}</p>
        </div>
      </div>
      <div className="progress-chart">
        <h3>Skills Progress by Module</h3>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DBTProgress;