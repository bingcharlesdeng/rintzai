import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './progressReport.css';

const ProgressReport = ({ moodEntries }) => {
  const getWeeklyMoodData = () => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const weeklyData = moodEntries
      .filter(entry => new Date(entry.date) >= lastWeek)
      .reduce((acc, entry) => {
        const day = new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' });
        if (!acc[day]) {
          acc[day] = { day, count: 0, totalIntensity: 0 };
        }
        acc[day].count += 1;
        acc[day].totalIntensity += entry.intensity;
        return acc;
      }, {});

    return Object.values(weeklyData).map(data => ({
      ...data,
      averageIntensity: data.totalIntensity / data.count
    }));
  };

  const weeklyMoodData = getWeeklyMoodData();

  return (
    <div className="progress-report">
      <h3>Weekly Mood Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyMoodData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Entries" />
          <Bar yAxisId="right" dataKey="averageIntensity" fill="#82ca9d" name="Avg Intensity" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressReport;