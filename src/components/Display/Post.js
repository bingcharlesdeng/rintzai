import React from 'react';
import './post.css';

const Post = ({ post, onClick, onDeletePost }) => {
  console.log('Rendering Post:', post);

  return (
    <div className="post" onClick={onClick}>
      {post.type === 'image' ? (
        <img
          src={post.url}
          alt={post.caption}
          className="post-media"
          onLoad={() => console.log('Image loaded successfully:', post.url)}
          onError={() => console.error('Error loading image:', post.url)}
        />
      ) : (
        <video
          src={post.url}
          controls
          className="post-media"
          onLoadedData={() => console.log('Video loaded successfully:', post.url)}
          onError={() => console.error('Error loading video:', post.url)}
        />
      )}
      <div className="post-overlay">
        <div className="post-likes">
          <i className="fas fa-heart"></i>
          <span>{post.likes || 0}</span>
        </div>
        <div className="post-actions">
          <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDeletePost(); }}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;