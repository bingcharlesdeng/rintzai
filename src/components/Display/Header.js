import React from 'react';
import './header.css';

const Header = ({ user, posts, onNewPostClick }) => {
  return (
    <header className="header">
      <div className="user-info">
        <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
        <div>
          <h1>{user.displayName}</h1>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="user-stats">
        <div>Posts: {posts.length}</div>
        {/* Add more stats here if needed */}
      </div>
      <button onClick={onNewPostClick} className="new-post-button">New Post</button>
    </header>
  );
};

export default Header;