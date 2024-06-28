import React from 'react';
import './JournalInsights.css';

const JournalInsights = ({ data }) => {
  console.log('Rendering JournalInsights with data:', data);

  return (
    <div className="journal-insights">
      <h2>Journal Insights</h2>
      <div className="word-frequency">
        <h3>Most Used Words</h3>
        <ul className="word-list">
          {data.wordFrequency.slice(0, 10).map((word, index) => (
            <li key={index} style={{fontSize: `${14 + word.value * 10}px`}}>
              {word.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="sentiment-analysis">
        <h3>Sentiment Analysis</h3>
        <p>Overall sentiment: <strong>{data.overallSentiment}</strong></p>
        <p>Positive entries: <strong>{data.positiveSentimentPercentage}%</strong></p>
        <p>Negative entries: <strong>{data.negativeSentimentPercentage}%</strong></p>
        <p>Neutral entries: <strong>{data.neutralSentimentPercentage}%</strong></p>
        <p>Sentiment trend: {data.sentimentTrend}</p>
        <p>Emotional depth score: {data.emotionalDepthScore} out of 10</p>
      </div>
      <div className="topic-analysis">
        <h3>Common Topics</h3>
        <ul>
          {data.commonTopics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>
      <div className="writing-patterns">
        <h3>Writing Patterns</h3>
        <p>Average entry length: {data.averageEntryLength} words</p>
        <p>Writing frequency: {data.writingFrequency}</p>
        <p>Time of day pattern: {data.timeOfDayPattern}</p>
      </div>
    </div>
  );
};

export default JournalInsights;