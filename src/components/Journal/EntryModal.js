import React from 'react';
import './entryModal.css';

const EntryModal = ({ entry, isOpen, onClose, highlightSearchTerm }) => {
  if (!isOpen || !entry) return null;

  const { title, content, date, mood, tags } = entry;
    console.log("OPened entry modal");
  return (
    <div className="entry-modal-overlay" onClick={onClose}>
      <div className="entry-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="entry-modal-header">
          <h2 className="entry-modal-title">{title}</h2>
          <button className="entry-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="entry-modal-body">
          <div className="entry-modal-meta">
            <p className="entry-modal-date">
              {date instanceof Date ? date.toLocaleDateString() : 'Unknown date'}
            </p>
            <p className="entry-modal-mood">Mood: {mood}</p>
            {tags && tags.length > 0 && (
              <div className="entry-modal-tags">
                Tags: {tags.map((tag, index) => (
                  <span key={index} className="entry-modal-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
          <div
            className="entry-modal-content"
            dangerouslySetInnerHTML={{ __html: highlightSearchTerm(content) }}
          />
        </div>
      </div>
    </div>
  );
};

export default EntryModal;