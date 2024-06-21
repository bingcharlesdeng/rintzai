import React from 'react';
import './supportNetwork.css';

const SupportNetwork = ({ network, onProfileUpdate }) => {
  const handleRemoveSupporter = (supporterId) => {
    const updatedNetwork = network.filter(id => id !== supporterId);
    onProfileUpdate({ supportNetwork: updatedNetwork });
  };

  return (
    <div className="support-network">
      <h2>My Support Network</h2>
      {network && network.length > 0 ? (
        <ul className="network-list">
          {network.map((supporterId) => (
            <li key={supporterId} className="supporter-item">
              <span>{supporterId}</span>
              <button onClick={() => handleRemoveSupporter(supporterId)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your support network is empty. Add people who support your recovery journey!</p>
      )}
    </div>
  );
};

export default SupportNetwork;