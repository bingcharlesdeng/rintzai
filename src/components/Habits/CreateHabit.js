import React, { useState } from 'react';
import './CreateHabit.css';

const CreateHabit = ({ onAddHabit }) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [category, setCategory] = useState('mental_health');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAddHabit({
        name: name.trim(),
        frequency,
        category,
        streak: 0,
        completedDates: [],
      });
      setName('');
      setFrequency('daily');
      setCategory('mental_health');
    }
  };

  return (
    <div className="create-habit">
      <h2>Create New Habit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Habit name"
          required
        />
        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="mental_health">Mental Health</option>
          <option value="substance_abuse">Substance Abuse</option>
        </select>
        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
};

export default CreateHabit;