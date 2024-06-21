import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './moodCalendar.css';

const MoodCalendar = ({ moodEntries }) => {
  const getMoodForDate = (date) => {
    const entry = moodEntries.find(entry => 
      new Date(entry.date).toDateString() === date.toDateString()
    );
    return entry ? entry.mood : null;
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const mood = getMoodForDate(date);
      return mood ? <div className={`mood-indicator ${mood}`}></div> : null;
    }
  };

  return (
    <div className="mood-calendar">
      <h3>Mood Calendar</h3>
      <Calendar
        tileContent={tileContent}
        className="react-calendar"
      />
    </div>
  );
};

export default MoodCalendar;