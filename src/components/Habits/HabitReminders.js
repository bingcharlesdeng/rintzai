import React, { useState } from 'react';
import './HabitReminders.css';

const HabitReminders = ({ habits, onUpdateHabit }) => {
  const [selectedHabit, setSelectedHabit] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  const handleSetReminder = () => {
    if (selectedHabit && reminderTime) {
      const habit = habits.find(h => h.id === selectedHabit);
      const updatedHabit = { ...habit, reminderTime };
      onUpdateHabit(updatedHabit);
      setSelectedHabit('');
      setReminderTime('');
    }
  };

  return (
    <div className="habit-reminders">
      <h2>Set Reminders</h2>
      <select 
        value={selectedHabit} 
        onChange={(e) => setSelectedHabit(e.target.value)}
      >
        <option value="">Select a habit</option>
        {habits.map(habit => (
          <option key={habit.id} value={habit.id}>{habit.name}</option>
        ))}
      </select>
      <input 
        type="time"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
      />
      <button onClick={handleSetReminder}>Set Reminder</button>
      <div className="current-reminders">
        <h3>Current Reminders</h3>
        {habits.filter(habit => habit.reminderTime).map(habit => (
          <div key={habit.id} className="reminder-item">
            <span>{habit.name}: {habit.reminderTime}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitReminders;