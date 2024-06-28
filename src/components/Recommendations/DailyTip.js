import React from 'react';
import './DailyTip.css';

const DailyTip = ({ data, onFeedback }) => {
  console.log('Rendering DailyTip with data:', data);

  if (!data) {
    return <div className="no-tip">No daily tip available at the moment.</div>;
  }

  return (
    <div className="daily-tip">
      <h2>Your Daily Mental Health Tip</h2>
      <div className="tip-content">
        <p>{data.tip}</p>
        <div className="tip-category">Category: {data.category}</div>
      </div>
      <div className="tip-explanation">
        <h3>Why This Matters</h3>
        <p>{data.explanation}</p>
      </div>
      <div className="tip-action">
        <h3>How to Apply This</h3>
        <ol>
          {data.actionSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
      <div className="tip-feedback">
        <h3>Was this tip helpful?</h3>
        <div className="feedback-buttons">
          <button onClick={() => onFeedback('dailyTip', data.id, 'positive')}>👍 Yes</button>
          <button onClick={() => onFeedback('dailyTip', data.id, 'negative')}>👎 No</button>
        </div>
      </div>
    </div>
  );
};

export default DailyTip;