import React from 'react';
import './post.css';

const Post = React.memo(({ post, onClick, onDeletePost }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDeletePost();
  };

  return (
    <div className="post" onClick={handleClick}>
      {post.type === 'image' ? (
        <img
          src={post.url}
          alt={post.caption}
          className="post-media"
          loading="lazy"
        />
      ) : (
        <video
          src={post.url}
          className="post-media"
          preload="metadata"
        />
      )}
      <div className="post-overlay">
        <div className="post-likes">
          <i className="fas fa-heart"></i>
          <span>{post.likes || 0}</span>
        </div>
        <div className="post-actions">
          <button className="delete-button" onClick={handleDelete}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
});

export default Post;