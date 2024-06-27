import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './HabitCalendar.css';

const HabitCalendar = ({ habit, onUpdateHabit }) => {
  const handleDateClick = (date) => {
    const dateString = date.toISOString().split('T')[0];
    let updatedCompletedDates;
    if (habit.completedDates.includes(dateString)) {
      updatedCompletedDates = habit.completedDates.filter(d => d !== dateString);
    } else {
      updatedCompletedDates = [...habit.completedDates, dateString];
    }
    onUpdateHabit({ ...habit, completedDates: updatedCompletedDates });
  };

  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split('T')[0];
    return habit.completedDates.includes(dateString) ? 'completed' : null;
  };

  return (
    <div className="habit-calendar">
      <h2>{habit.name} Calendar</h2>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default HabitCalendar;