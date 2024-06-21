import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './moodOverview.css';

const MoodOverview = ({ moodEntries }) => {
  const chartData = moodEntries.map(entry => ({
    date: new Date(entry.date).toLocaleDateString(),
    intensity: entry.intensity,
    mood: entry.mood
  }));

  return (
    <div className="mood-overview">
      <h3>Mood Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="intensity" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="mood" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodOverview;