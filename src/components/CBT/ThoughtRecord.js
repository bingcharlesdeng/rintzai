import React, { useState } from 'react';
import './ThoughtRecord.css';

const ThoughtRecord = ({ userData, onDataUpdate }) => {
  const [situation, setSituation] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [emotions, setEmotions] = useState('');
  const [behaviors, setBehaviors] = useState('');
  const [alternativeThoughts, setAlternativeThoughts] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newThoughtRecord = {
      situation,
      thoughts,
      emotions,
      behaviors,
      alternativeThoughts,
      date: new Date().toISOString(),
    };
    onDataUpdate({ thoughtRecords: [...(userData.thoughtRecords || []), newThoughtRecord] });
    // Reset form
    setSituation('');
    setThoughts('');
    setEmotions('');
    setBehaviors('');
    setAlternativeThoughts('');
  };

  return (
    <div className="thought-record">
      <h2>Thought Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="situation">Situation:</label>
          <textarea
            id="situation"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="thoughts">Thoughts:</label>
          <textarea
            id="thoughts"
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emotions">Emotions:</label>
          <textarea
            id="emotions"
            value={emotions}
            onChange={(e) => setEmotions(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="behaviors">Behaviors:</label>
          <textarea
            id="behaviors"
            value={behaviors}
            onChange={(e) => setBehaviors(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="alternativeThoughts">Alternative Thoughts:</label>
          <textarea
            id="alternativeThoughts"
            value={alternativeThoughts}
            onChange={(e) => setAlternativeThoughts(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Thought Record</button>
      </form>
      <div className="thought-record-history">
        <h3>Previous Thought Records</h3>
        {userData.thoughtRecords && userData.thoughtRecords.length > 0 ? (
          userData.thoughtRecords.map((record, index) => (
            <div key={index} className="thought-record-item">
              <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
              <p><strong>Situation:</strong> {record.situation}</p>
              <p><strong>Thoughts:</strong> {record.thoughts}</p>
              <p><strong>Emotions:</strong> {record.emotions}</p>
              <p><strong>Behaviors:</strong> {record.behaviors}</p>
              <p><strong>Alternative Thoughts:</strong> {record.alternativeThoughts}</p>
            </div>
          ))
        ) : (
          <p>No thought records yet.</p>
        )}
      </div>
    </div>
  );
};

export default ThoughtRecord;