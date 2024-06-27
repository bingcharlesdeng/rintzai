import React from 'react';
import './ResourceBookmarks.css';

const ResourceBookmarks = ({ bookmarks, onResourceSelect }) => {
  return (
    <div className="resource-bookmarks">
      <h3>Your Bookmarks</h3>
      {bookmarks.length > 0 ? (
        <ul>
          {bookmarks.map(bookmark => (
            <li key={bookmark.id} onClick={() => onResourceSelect(bookmark)}>
              {bookmark.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't bookmarked any resources yet.</p>
      )}
    </div>
  );
};

export default ResourceBookmarks;