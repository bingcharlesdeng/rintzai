import React from 'react';
import './HabitStats.css';

const HabitStats = ({ habit }) => {
  const calculateStreak = () => {
    let streak = 0;
    const sortedDates = habit.completedDates.sort((a, b) => new Date(b) - new Date(a));
    const today = new Date().toISOString().split('T')[0];
    
    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i]);
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (date.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const completionRate = () => {
    const totalDays = Math.ceil((new Date() - new Date(habit.completedDates[0])) / (1000 * 60 * 60 * 24));
    return ((habit.completedDates.length / totalDays) * 100).toFixed(2);
  };

  return (
    <div className="habit-stats">
      <h2>{habit.name} Stats</h2>
      <p>Current Streak: {calculateStreak()} days</p>
      <p>Total Completions: {habit.completedDates.length}</p>
      <p>Completion Rate: {completionRate()}%</p>
    </div>
  );
};

export default HabitStats;