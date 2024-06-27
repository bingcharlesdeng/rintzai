import React, { useState, useEffect } from 'react';
import './GoalReminders.css';

const GoalReminders = ({ goals }) => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const upcomingGoals = goals.filter(goal => {
      const deadline = new Date(goal.deadline);
      const daysUntilDeadline = Math.ceil((deadline - currentDate) / (1000 * 60 * 60 * 24));
      return daysUntilDeadline <= 7 && daysUntilDeadline > 0;
    });

    setReminders(upcomingGoals);

    // Set up notifications
    upcomingGoals.forEach(goal => {
      if (Notification.permission === "granted") {
        new Notification(`Goal Reminder: ${goal.title}`, {
          body: `Your goal "${goal.title}" is due in ${Math.ceil((new Date(goal.deadline) - currentDate) / (1000 * 60 * 60 * 24))} days.`
        });
      }
    });
  }, [goals]);

  return (
    <div className="goal-reminders">
      <h3>Upcoming Deadlines</h3>
      {reminders.length > 0 ? (
        <ul>
          {reminders.map(goal => (
            <li key={goal.id}>
              <span className="reminder-title">{goal.title}</span>
              <span className="reminder-deadline">Due: {goal.deadline}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming deadlines in the next 7 days.</p>
      )}
    </div>
  );
};

export default GoalReminders;