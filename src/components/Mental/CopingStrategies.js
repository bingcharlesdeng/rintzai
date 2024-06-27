import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../../firebase/firebase';
import './CopingStrategies.css';

const CopingStrategies = ({ userData, updateUserData }) => {
  const [strategies, setStrategies] = useState([]);
  const [userStrategies, setUserStrategies] = useState(userData.copingStrategies || []);

  useEffect(() => {
    const fetchStrategies = async () => {
      const strategiesRef = collection(db, 'copingStrategies');
      const snapshot = await getDocs(strategiesRef);
      const fetchedStrategies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStrategies(fetchedStrategies);
    };
    fetchStrategies();
  }, []);

  const handleStrategyToggle = (strategyId) => {
    const updatedStrategies = userStrategies.includes(strategyId)
      ? userStrategies.filter(id => id !== strategyId)
      : [...userStrategies, strategyId];
    setUserStrategies(updatedStrategies);
    updateUserData({ copingStrategies: updatedStrategies });
  };

  return (
    <div className="coping-strategies">
      <h2>Coping Strategies</h2>
      <div className="strategies-list">
        {strategies.map(strategy => (
          <div key={strategy.id} className="strategy-item">
            <h3>{strategy.title}</h3>
            <p>{strategy.description}</p>
            <button
              onClick={() => handleStrategyToggle(strategy.id)}
              className={userStrategies.includes(strategy.id) ? 'active' : ''}
            >
              {userStrategies.includes(strategy.id) ? 'Remove from My Strategies' : 'Add to My Strategies'}
            </button>
            {strategy.steps && (
              <div className="strategy-steps">
                <h4>How to practice:</h4>
                <ol>
                  {strategy.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CopingStrategies;