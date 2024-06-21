import React from 'react';
import './journalEntryList.css';

const JournalEntryList = ({ entries, onEntrySelect, selectedEntry }) => {
  return (
    <div className="journal-entry-list">
      <h2>Your Entries</h2>
      {entries.map(entry => (
        <div 
          key={entry.id} 
          className={`entry-item ${selectedEntry && selectedEntry.id === entry.id ? 'selected' : ''}`}
          onClick={() => onEntrySelect(entry)}
        >
          <h3>{entry.title}</h3>
          <p>{entry.content.substring(0, 100)}...</p>
          <div className="entry-meta">
            <span className={`mood-indicator ${entry.mood}`}>{entry.mood}</span>
            <span className="entry-date">{entry.date.toDate().toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JournalEntryList;