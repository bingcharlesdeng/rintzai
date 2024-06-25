import React, { useState, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './postModal.css';

const PostModal = ({ post, onClose, onDelete, onEdit, addComment, addTag }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ ...post });
  const [newComment, setNewComment] = useState('');
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setEditedPost({ ...post });
  }, [post]);

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

  const handleEdit = async () => {
    try {
      await onEdit(post.id, editedPost);
      setIsEditing(false);
      setError('');
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost(prev => ({ ...prev, [name]: value }));
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await addComment(post.id, newComment);
        setEditedPost(prev => ({
          ...prev,
          comments: [...(prev.comments || []), newComment]
        }));
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
        setError('Failed to add comment. Please try again.');
      }
    }
  };

  const handleAddTag = async () => {
    if (newTag.trim()) {
      try {
        await addTag(post.id, newTag);
        setEditedPost(prev => ({
          ...prev,
          tags: [...(prev.tags || []), newTag]
        }));
        setNewTag('');
      } catch (error) {
        console.error('Error adding tag:', error);
        setError('Failed to add tag. Please try again.');
      }
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
              {editedPost.type === 'image' ? (
                <img src={editedPost.url} alt={editedPost.altText || 'Post image'} />
              ) : (
                <video src={editedPost.url} controls />
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
              {error && <p className="error-message">{error}</p>}
            </div>
          ) : (
            <div className="view-section">
              <p className="post-caption">{editedPost.caption}</p>
              <p className="post-location">{editedPost.location}</p>
              <button onClick={() => setIsEditing(true)} className="edit-button" aria-label="Edit post">Edit</button>
            </div>
          )}
          <div className="comments-section">
            <h3>Comments</h3>
            <div className="post-comments">
              {editedPost.comments && editedPost.comments.map((comment, index) => (
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
              {editedPost.tags && editedPost.tags.map((tag, index) => (
                <span key={index} className="tag-item">#{tag}</span>
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
          <button onClick={() => onDelete(editedPost.id)} className="delete-button" aria-label="Delete post">Delete Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;