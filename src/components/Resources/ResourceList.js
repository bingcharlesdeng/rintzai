import React from 'react';
import './ResourceList.css';

const ResourceList = ({ resources, onResourceSelect, bookmarks, onBookmarkToggle }) => {
  return (
    <div className="resource-list">
      {resources.map(resource => (
        <div key={resource.id} className="resource-item">
          <h3 onClick={() => onResourceSelect(resource)}>{resource.title}</h3>
          <p>{resource.description.substring(0, 100)}...</p>
          <div className="resource-meta">
            <span className="resource-category">{resource.category}</span>
            <span className="resource-type">{resource.type}</span>
          </div>
          <button 
            className={`bookmark-button ${bookmarks.includes(resource.id) ? 'bookmarked' : ''}`}
            onClick={() => onBookmarkToggle(resource.id)}
          >
            {bookmarks.includes(resource.id) ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ResourceList;