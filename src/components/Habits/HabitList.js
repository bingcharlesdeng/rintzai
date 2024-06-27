import React from 'react';
import './HabitList.css';

const HabitList = ({ habits, onHabitSelect, onDeleteHabit }) => {
  return (
    <div className="habit-list">
      <h2>Your Habits</h2>
      {habits.map(habit => (
        <div key={habit.id} className="habit-item">
          <span onClick={() => onHabitSelect(habit)}>{habit.name}</span>
          <button onClick={() => onDeleteHabit(habit.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default HabitList;