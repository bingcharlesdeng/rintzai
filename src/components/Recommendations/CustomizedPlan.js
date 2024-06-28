import React from 'react';
import './CustomizedPlan.css';

const CustomizedPlan = ({ data, onFeedback }) => {
  console.log('Rendering CustomizedPlan with data:', data);

  if (!data) {
    return <div className="no-plan">No customized plan available at the moment.</div>;
  }

  return (
    <div className="customized-plan">
      <h2>Your Customized Mental Health Plan</h2>
      <div className="plan-overview">
        <p>{data.overview}</p>
      </div>
      <div className="plan-sections">
        {Object.entries(data.sections).map(([sectionName, sectionData]) => (
          <div key={sectionName} className="plan-section">
            <h3>{sectionName}</h3>
            <ul>
              {sectionData.map((item) => (
                <li key={item.id}>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  {item.frequency && <span className="frequency">Frequency: {item.frequency}</span>}
                  <div className="item-feedback">
                    <button onClick={() => onFeedback('customPlanItem', item.id, 'positive')}>👍</button>
                    <button onClick={() => onFeedback('customPlanItem', item.id, 'negative')}>👎</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="plan-review">
        <h3>Plan Review</h3>
        <p>Next review date: {data.nextReviewDate}</p>
        <button className="review-plan-btn">Review and Adjust Plan</button>
      </div>
      <div className="overall-plan-feedback">
        <h3>How helpful is this plan overall?</h3>
        <div className="feedback-buttons">
          <button onClick={() => onFeedback('customPlan', data.id, 'veryHelpful')}>Very Helpful</button>
          <button onClick={() => onFeedback('customPlan', data.id, 'somewhatHelpful')}>Somewhat Helpful</button>
          <button onClick={() => onFeedback('customPlan', data.id, 'notHelpful')}>Not Helpful</button>
        </div>
      </div>
    </div>
  );
};

export default CustomizedPlan;