import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './journalInsights.css';

const JournalInsights = ({ entries = [] }) => {
  console.log('Rendering JournalInsights with entries:', entries);

  const moodData = entries.reduce((acc, entry) => {
    if (entry && entry.mood) {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    }
    return acc;
  }, {});

  const moodChartData = Object.keys(moodData).map(mood => ({
    name: mood,
    value: moodData[mood]
  }));

  const tagData = entries.reduce((acc, entry) => {
    if (entry && entry.tags && Array.isArray(entry.tags)) {
      entry.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const tagChartData = Object.keys(tagData)
    .map(tag => ({ name: tag, count: tagData[tag] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="journal-insights">
      <h2>Journal Insights</h2>
      <div className="insight-charts">
        <div className="mood-distribution">
          <h3>Mood Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={moodChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {moodChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="top-tags">
          <h3>Top 5 Tags</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tagChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default JournalInsights;