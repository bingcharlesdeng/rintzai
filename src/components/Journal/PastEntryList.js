import React from 'react';
import './pastEntryList.css';

const PastEntryList = ({ entries = [], onEntryClick, highlightSearchTerm }) => {
  // Reverse the entries array to display most recent first
  const reversedEntries = [...entries].reverse();

  return (
    <div className="past-entries">
      <h3 className="past-entries-title">Past Entries</h3>
      {reversedEntries.length > 0 ? (
        <ul className="entry-list">
          {reversedEntries.map((entry) => (
            <li
              key={entry.id}
              className="past-entry"
              onClick={() => onEntryClick(entry)}
            >
              <div className="entry-date">
                {entry.date instanceof Date 
                  ? entry.date.toLocaleDateString()
                  : new Date(entry.date).toLocaleDateString()}
              </div>
              <div className="entry-content">{highlightSearchTerm(entry.content)}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-entries">No matching entries found.</p>
      )}
    </div>
  );
};

export default PastEntryList;