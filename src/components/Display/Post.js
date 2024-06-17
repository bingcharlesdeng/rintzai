import React from 'react';
import './post.css';

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post-media">
        {post.type === 'image' && <img src={post.url} alt={post.caption} />}
        {post.type === 'video' && <video src={post.url} controls />}
        {post.type === 'audio' && <audio src={post.url} controls />}
        {post.type === 'text' && <p className="post-text">{post.content}</p>}
      </div>
      <div className="post-details">
        <p className="caption">{post.caption}</p>
        <div className="post-actions">
          <button className="like-button">
            <i className="fa fa-heart" aria-hidden="true"></i>
          </button>
          <button className="comment-button">
            <i className="fa fa-comment" aria-hidden="true"></i>
          </button>
          <button className="share-button">
            <i className="fa fa-share" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;