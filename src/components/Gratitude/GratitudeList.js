import React, { useState } from 'react';
import './gratitudeList.css';

const GratitudeList = () => {
  const [gratitudes, setGratitudes] = useState([]);
  const [newGratitude, setNewGratitude] = useState('');

  const handleInputChange = (e) => {
    setNewGratitude(e.target.value);
  };

  const handleAddGratitude = () => {
    if (newGratitude.trim() !== '') {
      const currentDate = new Date().toLocaleDateString();
      const gratitude = {
        id: Date.now(),
        text: newGratitude,
        date: currentDate,
      };
      setGratitudes([...gratitudes, gratitude]);
      setNewGratitude('');
    }
  };

  const handleDeleteGratitude = (id) => {
    const updatedGratitudes = gratitudes.filter((gratitude) => gratitude.id !== id);
    setGratitudes(updatedGratitudes);
  };

  return (
    <div className="gratitude-list-container">
      <h2 className="gratitude-list-title">My Gratitude List</h2>
      <div className="gratitude-input-container">
        <input
          type="text"
          value={newGratitude}
          onChange={handleInputChange}
          placeholder="I am grateful for..."
          className="gratitude-input"
        />
        <button onClick={handleAddGratitude} className="add-gratitude-button">
          Add Gratitude
        </button>
      </div>
      {gratitudes.length > 0 ? (
        <ul className="gratitude-list">
          {gratitudes.map((gratitude) => (
            <li key={gratitude.id} className="gratitude-item">
              <div className="gratitude-text">{gratitude.text}</div>
              <div className="gratitude-date">{gratitude.date}</div>
              <button
                onClick={() => handleDeleteGratitude(gratitude.id)}
                className="delete-gratitude-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-gratitudes-message">No gratitudes added yet.</p>
      )}
    </div>
  );
};

export default GratitudeList;