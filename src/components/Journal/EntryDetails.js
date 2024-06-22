import React from 'react';
import './entryDetails.css';

const EntryDetails = ({ entry, onClose, highlightSearchTerm }) => {
  if (!entry) {
    return null;
  }

  const { title, content, date, mood, tags } = entry;

  return (
    <div className="entry-details-overlay" onClick={onClose}>
      <div className="entry-details-container" onClick={(e) => e.stopPropagation()}>
        <div className="entry-details-header">
          <h2 className="entry-details-title">{title}</h2>
          <button className="entry-details-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="entry-details-body">
          <div className="entry-details-meta">
            <div className="entry-details-date">
              <i className="far fa-calendar-alt"></i>
              <span>{date instanceof Date ? date.toLocaleDateString() : 'Unknown date'}</span>
            </div>
            <div className="entry-details-mood">
              <i className="far fa-smile"></i>
              <span>{mood}</span>
            </div>
            {tags && tags.length > 0 && (
              <div className="entry-details-tags">
                <i className="far fa-tags"></i>
                {tags.map((tag, index) => (
                  <span key={index} className="entry-details-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
          <div
            className="entry-details-content"
            dangerouslySetInnerHTML={{ __html: highlightSearchTerm(content) }}
          />
        </div>
      </div>
    </div>
  );
};

export default EntryDetails;