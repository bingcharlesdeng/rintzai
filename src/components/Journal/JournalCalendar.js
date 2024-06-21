import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './journalCalendar.css';

const JournalCalendar = ({ entries, onSelectDate }) => {
  console.log('Rendering JournalCalendar with entries:', entries);

  const entriesMap = entries.reduce((acc, entry) => {
    const dateKey = entry.date.toDate().toDateString();
    acc[dateKey] = entry;
    return acc;
  }, {});

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateKey = date.toDateString();
      if (dateKey in entriesMap) {
        return <div className={`calendar-entry-indicator ${entriesMap[dateKey].mood}`}></div>;
      }
    }
    return null;
  };

  const handleDateClick = (date) => {
    const dateKey = date.toDateString();
    if (dateKey in entriesMap) {
      onSelectDate(entriesMap[dateKey]);
    }
  };

  return (
    <div className="journal-calendar">
      <Calendar
        tileContent={tileContent}
        onClickDay={handleDateClick}
        className="custom-calendar"
      />
    </div>
  );
};

export default JournalCalendar;