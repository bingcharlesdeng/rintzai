import React from 'react';
import './entryDetails.css';

const EntryDetails = ({ entry, onBackClick, highlightSearchTerm }) => {
  if (!entry) {
    return null;
  }

  const { title, content, date, mood, tags } = entry;

  return (
    <div className="entry-details">
      <h2 className="entry-details-title">{title}</h2>
      <p className="entry-details-date">
        {date instanceof Date ? date.toLocaleDateString() : 'Unknown date'}
      </p>
      <p className="entry-details-mood">Mood: {mood}</p>
      <div 
        className="entry-details-content"
        dangerouslySetInnerHTML={{ __html: highlightSearchTerm(content) }}
      />
      {tags && tags.length > 0 && (
        <div className="entry-details-tags">
          Tags: {tags.join(', ')}
        </div>
      )}
      <button className="back-button" onClick={onBackClick}>
        Back to Entries
      </button>
    </div>
  );
};

export default EntryDetails;