// PostModal.js
import React from 'react';
import './postModal.css';

const PostModal = ({ post, onClose }) => {
  if (!post) {
    return null;
  }

  console.log('Rendering PostModal for post:', post);

  return (
    <div className="modal-overlay">
      <div className="post-modal">
        <div className="modal-content">
          <div className="modal-header">
            <button className="close-button" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-media-container">
              {post.type === 'image' && (
                <img src={post.url} alt={post.caption} className="modal-media" />
              )}
              {post.type === 'video' && (
                <video src={post.url} controls className="modal-media" />
              )}
            </div>
            <div className="modal-details">
              <div className="post-header">
                <img src={post.userAvatar} alt="User Avatar" className="user-avatar" />
                <h3 className="username">{post.username}</h3>
              </div>
              <div className="post-caption">{post.caption}</div>
              <div className="post-comments">
                {/* Render comments here */}
              </div>
              <div className="post-actions">
                <button className="like-button">
                  <i className="fas fa-heart"></i>
                </button>
                <button className="comment-button">
                  <i className="fas fa-comment"></i>
                </button>
                <button className="share-button">
                  <i className="fas fa-share"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;