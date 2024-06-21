import React from 'react';
import './entryDetails.css';
import { formatDateTime } from '../utils/dateUtils';

const EntryDetails = ({ entry, onBackClick, highlightSearchTerm }) => {
  const { content, searchTerm } = entry;

  const highlightedContent = highlightSearchTerm(content);

  return (
    <div className="entry-details">
      <h3 className="entry-details-title">{formatDateTime(entry.createdAt)}</h3>
      <div className="entry-details-content">{highlightedContent}</div>
      {entry.notes && <p className="entry-details-notes">Notes: {entry.notes}</p>}
      <button className="back-button" onClick={onBackClick}>
        Back to Entries
      </button>
    </div>
  );
};

export default EntryDetails;