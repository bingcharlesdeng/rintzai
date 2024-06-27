import React, { useState } from 'react';
import './AffirmationReminders.css';

const AffirmationReminders = ({ reminders, onUpdateReminders }) => {
  const [newReminder, setNewReminder] = useState({ time: '', days: [] });

  const handleAddReminder = () => {
    if (newReminder.time && newReminder.days.length > 0) {
      const updatedReminders = [...reminders, newReminder];
      onUpdateReminders(updatedReminders);
      setNewReminder({ time: '', days: [] });
    }
  };

  const handleDeleteReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    onUpdateReminders(updatedReminders);
  };

  const handleDayToggle = (day) => {
    const updatedDays = newReminder.days.includes(day)
      ? newReminder.days.filter(d => d !== day)
      : [...newReminder.days, day];
    setNewReminder({ ...newReminder, days: updatedDays });
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="affirmation-reminders">
      <h3>Reminders</h3>
      <div className="add-reminder">
        <input
          type="time"
          value={newReminder.time}
          onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
        />
        <div className="day-toggles">
          {days.map(day => (
            <button
              key={day}
              className={newReminder.days.includes(day) ? 'active' : ''}
              onClick={() => handleDayToggle(day)}
            >
              {day}
            </button>
          ))}
        </div>
        <button onClick={handleAddReminder}>Add Reminder</button>
      </div>
      <ul className="reminder-list">
        {reminders.map((reminder, index) => (
          <li key={index}>
            <span>{reminder.time}</span>
            <span>{reminder.days.join(', ')}</span>
            <button onClick={() => handleDeleteReminder(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AffirmationReminders;