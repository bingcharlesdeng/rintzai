import React from 'react';
import './moodInsights.css';

const MoodInsights = ({ moodEntries }) => {
  const getMoodCounts = () => {
    return moodEntries.reduce((counts, entry) => {
      counts[entry.mood] = (counts[entry.mood] || 0) + 1;
      return counts;
    }, {});
  };

  const getAverageIntensity = () => {
    const sum = moodEntries.reduce((sum, entry) => sum + entry.intensity, 0);
    return (sum / moodEntries.length).toFixed(2);
  };

  const getMostCommonFeelings = () => {
    const feelingCounts = moodEntries.flatMap(entry => entry.feelings)
      .reduce((counts, feeling) => {
        counts[feeling] = (counts[feeling] || 0) + 1;
        return counts;
      }, {});
    return Object.entries(feelingCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([feeling, count]) => `${feeling} (${count})`);
  };

  const moodCounts = getMoodCounts();
  const averageIntensity = getAverageIntensity();
  const mostCommonFeelings = getMostCommonFeelings();

  return (
    <div className="mood-insights">
      <h3>Mood Insights</h3>
      <div className="insight-section">
        <h4>Mood Distribution</h4>
        <ul>
          {Object.entries(moodCounts).map(([mood, count]) => (
            <li key={mood}>{`${mood}: ${count}`}</li>
          ))}
        </ul>
      </div>
      <div className="insight-section">
        <h4>Average Mood Intensity</h4>
        <p>{averageIntensity}</p>
      </div>
      <div className="insight-section">
        <h4>Most Common Feelings</h4>
        <ul>
          {mostCommonFeelings.map((feeling, index) => (
            <li key={index}>{feeling}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoodInsights;