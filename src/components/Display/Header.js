import React from 'react';
import './header.css';

const Header = ({ user, posts, onNewPostClick }) => {
  const postCount = posts.length;
  const likeCount = posts.reduce((total, post) => total + (post.likes || 0), 0);
  const commentCount = posts.reduce((total, post) => total + (post.comments ? post.comments.length : 0), 0);

  return (
    <header className="header">
      <div className="user-info">
        <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
        <div className="user-details">
          <h1>{user.displayName}</h1>
          <p>{user.email}</p>
          <div className="user-bio">{user.bio || 'No bio provided'}</div>
        </div>
      </div>
      <div className="user-stats">
        <div className="stat-item">
          <span className="stat-count">{postCount}</span>
          <span className="stat-label">Posts</span>
        </div>
        <div className="stat-item">
          <span className="stat-count">{likeCount}</span>
          <span className="stat-label">Likes</span>
        </div>
        <div className="stat-item">
          <span className="stat-count">{commentCount}</span>
          <span className="stat-label">Comments</span>
        </div>
      </div>
      <button onClick={onNewPostClick} className="new-post-button">
        <i className="fas fa-plus"></i> New Post
      </button>
    </header>
  );
};

export default Header;