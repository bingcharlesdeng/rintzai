import React from 'react';
import './LongTermGoals.css';

const LongTermGoals = ({ data, onFeedback }) => {
  console.log('Rendering LongTermGoals with data:', data);

  if (!data || data.length === 0) {
    return <div className="no-goals">No long-term goals available at the moment.</div>;
  }

  return (
    <div className="long-term-goals">
      <h2>Long-Term Mental Health Goals</h2>
      <div className="goals-list">
        {data.map((goal) => (
          <div key={goal.id} className="goal-item">
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <div className="goal-progress">
              <div className="progress-bar" style={{ width: `${goal.progress}%` }}></div>
              <span>{goal.progress}% Complete</span>
            </div>
            <h4>Next Steps:</h4>
            <ul>
              {goal.nextSteps.map((step, stepIndex) => (
                <li key={stepIndex}>{step}</li>
              ))}
            </ul>
            <div className="goal-feedback">
              <button onClick={() => onFeedback('longTermGoal', goal.id, 'positive')}>👍 Helpful</button>
              <button onClick={() => onFeedback('longTermGoal', goal.id, 'negative')}>👎 Not Helpful</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LongTermGoals;