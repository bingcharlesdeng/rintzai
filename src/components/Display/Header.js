import React from 'react';
import './header.css';
import defaultAvatar from '../../assets/default-avatar.png';

const Header = ({ user, posts, onNewPostClick }) => {
  const followers = user?.followers || 0;
  const following = user?.following || 0;

  return (
    <header className="header">
      <div className="user-info">
        <img
          src={user?.avatarUrl || defaultAvatar}
          alt="User Avatar"
          className="avatar"
        />
        <div className="user-details">
          <h2 className="username">{user?.username || 'Username'}</h2>
          <p className="bio">{user?.bio || 'User bio'}</p>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-count">{posts.length}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-count">{followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-count">{following}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
        </div>
      </div>
      <button className="new-post-button" onClick={onNewPostClick}>
        <i className="fas fa-plus"></i> New Post
      </button>
    </header>
  );
};

export default Header;