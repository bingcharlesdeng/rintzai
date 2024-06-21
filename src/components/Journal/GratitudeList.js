import React, { useState } from 'react';
import './gratitudeList.css';

const GratitudeList = ({ gratitudes, onAddGratitude }) => {
  const [newGratitude, setNewGratitude] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newGratitude) return;

    console.log('Adding new gratitude:', newGratitude);
    onAddGratitude(newGratitude);
    setNewGratitude('');
  };

  return (
    <div className="gratitude-list-container">
      <h3>Gratitude List</h3>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={newGratitude}
          onChange={(e) => setNewGratitude(e.target.value)}
          placeholder="Write something you're grateful for..."
        />
        <button type="submit">Add</button>
      </form>
      {gratitudes.length > 0 && (
        <ul>
          {gratitudes.map((gratitude, index) => (
            <li key={index}>{gratitude.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GratitudeList;