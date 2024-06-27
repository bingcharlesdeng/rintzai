import React, { useState, useEffect } from 'react';
import { fetchPeerSuggestions, sendConnectionRequest } from './socialService';
import './PeerConnections.css';

const PeerConnections = ({ userData, onDataUpdate }) => {
  const [peerSuggestions, setPeerSuggestions] = useState([]);

  useEffect(() => {
    const loadPeerSuggestions = async () => {
      const suggestions = await fetchPeerSuggestions(userData.id);
      setPeerSuggestions(suggestions);
    };
    loadPeerSuggestions();
  }, [userData.id]);

  const handleSendRequest = async (peerId) => {
    try {
      await sendConnectionRequest(userData.id, peerId);
      onDataUpdate({ 
        sentRequests: [...userData.sentRequests, peerId] 
      });
    } catch (error) {
      console.error('Error sending connection request:', error);
    }
  };

  return (
    <div className="peer-connections">
      <h2>Peer Connections</h2>
      <div className="peer-suggestions">
        <h3>Suggested Peers</h3>
        {peerSuggestions.map(peer => (
          <div key={peer.id} className="peer-item">
            <h4>{peer.name}</h4>
            <p>{peer.bio}</p>
            {userData.connections.includes(peer.id) ? (
              <button disabled>Connected</button>
            ) : userData.sentRequests.includes(peer.id) ? (
              <button disabled>Request Sent</button>
            ) : (
              <button onClick={() => handleSendRequest(peer.id)}>Connect</button>
            )}
          </div>
        ))}
      </div>
      <div className="current-connections">
        <h3>Your Connections</h3>
        {userData.connections.map(connectionId => (
          <div key={connectionId} className="connection-item">
            {/* Display connection information */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeerConnections;