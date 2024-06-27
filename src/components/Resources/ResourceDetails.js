import React from 'react';
import './ResourceDetails.css';

const ResourceDetails = ({ resource, isBookmarked, onBookmarkToggle }) => {
  return (
    <div className="resource-details">
      <h2>{resource.title}</h2>
      <p>{resource.description}</p>
      <div className="resource-meta">
        <span className="resource-category">{resource.category}</span>
        <span className="resource-type">{resource.type}</span>
      </div>
      {resource.url && (
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
          View Resource
        </a>
      )}
      <button 
        className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
        onClick={() => onBookmarkToggle(resource.id)}
      >
        {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
      </button>
    </div>
  );
};

export default ResourceDetails;