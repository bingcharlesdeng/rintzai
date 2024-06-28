import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CustomMetrics = ({ data }) => {
  console.log('Rendering CustomMetrics with data:', data);

  const [selectedMetric, setSelectedMetric] = useState(data.customMetrics[0].name);

  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: selectedMetric,
        data: data.customMetrics.find(metric => metric.name === selectedMetric).values,
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
        text: `Custom Metric: ${selectedMetric}`
      }
    }
  };
  
  return (
    <div className="custom-metrics">
      <h2>Custom Metrics</h2>
      <select 
        value={selectedMetric} 
        onChange={(e) => setSelectedMetric(e.target.value)}
        className="metric-selector"
      >
        {data.customMetrics.map(metric => (
          <option key={metric.name} value={metric.name}>{metric.name}</option>
        ))}
      </select>
      <Line data={chartData} options={options} />
      <div className="metric-insights">
        <h3>Metric Insights</h3>
        <p>Average value: <strong>{data.customMetrics.find(metric => metric.name === selectedMetric).average.toFixed(2)}</strong></p>
        <p>Trend: <strong>{data.customMetrics.find(metric => metric.name === selectedMetric).trend}</strong></p>
        <p>Correlation with mood: <strong>{data.customMetrics.find(metric => metric.name === selectedMetric).moodCorrelation}</strong></p>
        <p>Impact on overall well-being: {data.customMetrics.find(metric => metric.name === selectedMetric).impactOnWellbeing}</p>
        <p>Recommended actions: {data.customMetrics.find(metric => metric.name === selectedMetric).recommendedActions.join(', ')}</p>
      </div>
    </div>
  );
  };
  
  export default CustomMetrics;