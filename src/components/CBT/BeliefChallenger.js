import React, { useState } from 'react';
import './BeliefChallenger.css';

const BeliefChallenger = ({ userData, onDataUpdate }) => {
  const [belief, setBelief] = useState('');
  const [evidence, setEvidence] = useState('');
  const [alternativeView, setAlternativeView] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBeliefChallenge = {
      belief,
      evidence,
      alternativeView,
      date: new Date().toISOString(),
    };
    onDataUpdate({ beliefChallenges: [...(userData.beliefChallenges || []), newBeliefChallenge] });
    // Reset form
    setBelief('');
    setEvidence('');
    setAlternativeView('');
  };

  return (
    <div className="belief-challenger">
      <h2>Belief Challenger</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="belief">Negative Belief:</label>
          <textarea
            id="belief"
            value={belief}
            onChange={(e) => setBelief(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="evidence">Evidence Against This Belief:</label>
          <textarea
            id="evidence"
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="alternativeView">Alternative View:</label>
          <textarea
            id="alternativeView"
            value={alternativeView}
            onChange={(e) => setAlternativeView(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Belief Challenge</button>
      </form>
      <div className="belief-challenge-history">
        <h3>Previous Belief Challenges</h3>
        {userData.beliefChallenges && userData.beliefChallenges.length > 0 ? (
          userData.beliefChallenges.map((challenge, index) => (
            <div key={index} className="belief-challenge-item">
              <p><strong>Date:</strong> {new Date(challenge.date).toLocaleDateString()}</p>
              <p><strong>Negative Belief:</strong> {challenge.belief}</p>
              <p><strong>Evidence Against:</strong> {challenge.evidence}</p>
              <p><strong>Alternative View:</strong> {challenge.alternativeView}</p>
            </div>
          ))
        ) : (
          <p>No belief challenges recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default BeliefChallenger;