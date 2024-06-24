import React, { useState, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './postModal.css';

const PostModal = ({ post, onClose, onDelete, onEdit, addComment, addTag }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ ...post });
  const [newComment, setNewComment] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleOutsideClick = useCallback((e) => {
    if (e.target.classList.contains('post-modal')) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const handlers = useSwipeable({
    onSwipedDown: () => onClose(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleEdit = () => {
    onEdit(post.id, editedPost);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost(prev => ({ ...prev, [name]: value }));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(post.id, newComment);
      setNewComment('');
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      addTag(post.id, newTag);
      setNewTag('');
    }
  };

  return (
    <div {...handlers} className="post-modal">
      <div className="post-modal-content">
        <button onClick={onClose} className="exit-button" aria-label="Close modal">
          &times;
        </button>
        <div className="post-modal-media">
          <TransformWrapper>
            <TransformComponent>
              {post.type === 'image' ? (
                <img src={post.url} alt={post.altText || 'Post image'} />
              ) : (
                <video src={post.url} controls />
              )}
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div className="post-modal-info">
          {isEditing ? (
            <div className="edit-section">
              <textarea
                name="caption"
                value={editedPost.caption}
                onChange={handleInputChange}
                placeholder="Caption"
                aria-label="Edit caption"
              />
              <input
                type="text"
                name="location"
                value={editedPost.location}
                onChange={handleInputChange}
                placeholder="Location"
                aria-label="Edit location"
              />
              <button onClick={handleEdit} className="save-button" aria-label="Save changes">Save Changes</button>
            </div>
          ) : (
            <div className="view-section">
              <p className="post-caption">{post.caption}</p>
              <p className="post-location">{post.location}</p>
              <button onClick={() => setIsEditing(true)} className="edit-button" aria-label="Edit post">Edit</button>
            </div>
          )}
          <div className="comments-section">
            <h3>Comments</h3>
            <div className="post-comments">
              {post.comments && post.comments.map((comment, index) => (
                <p key={index} className="comment-item">{comment}</p>
              ))}
            </div>
            <div className="add-comment">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                aria-label="Add a comment"
              />
              <button onClick={handleAddComment} aria-label="Post comment">Post</button>
            </div>
          </div>
          <div className="tags-section">
            <h3>Tags</h3>
            <div className="post-tags">
              {post.tags && post.tags.map((tag, index) => (
                <span key={index} className="tag-item">{tag}</span>
              ))}
            </div>
            <div className="add-tag">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                aria-label="Add a tag"
              />
              <button onClick={handleAddTag} aria-label="Add tag">Add</button>
            </div>
          </div>
          <button onClick={() => onDelete(post.id)} className="delete-button" aria-label="Delete post">Delete Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;