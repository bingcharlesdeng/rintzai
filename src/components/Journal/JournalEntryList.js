import React from 'react';
import './journalEntryList.css';

const JournalEntryList = ({ entries, onEntrySelect, searchTerm }) => {
  console.log('Rendering JournalEntryList with entries:', entries);

  const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date));

  const highlightSearchMatches = (text, term) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="journal-entry-list">
      <h2>Your Entries</h2>
      {sortedEntries.map((entry) => (
        <div
          key={entry.id}
          className="entry-item"
          onClick={() => onEntrySelect(entry)}
        >
          <h3>{highlightSearchMatches(entry.title, searchTerm)}</h3>
          <p>
            {highlightSearchMatches(entry.content.substring(0, 100), searchTerm)}
            ...
          </p>
          <div className="entry-meta">
            <span className={`mood-indicator ${entry.mood}`}>{entry.mood}</span>
            <span className="entry-date">{formatDate(entry.date)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JournalEntryList;