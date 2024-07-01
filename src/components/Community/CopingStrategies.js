import React from 'react';
import './CopingStrategies.js';

const CopingStrategies = ({ strategies }) => {
  return (
    <div className="coping-strategies">
      <h2>Community Coping Strategies</h2>
      <div className="strategies-list">
        {strategies.map((strategy, index) => (
          <div key={index} className="strategy-item">
            <h3>{strategy.title}</h3>
            <p>{strategy.description}</p>
            <div className="strategy-meta">
              <span>Contributed by: {strategy.authorName}</span>
              <span>Likes: {strategy.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CopingStrategies;