import React, { useState } from 'react';
import './postModal.css';
import { motion } from 'framer-motion';

const PostModal = ({ post, onClose, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const [editedLocation, setEditedLocation] = useState(post.location);
  const [editedAltText, setEditedAltText] = useState(post.altText);
  const [editedTags, setEditedTags] = useState(post.tags ? post.tags.join(', ') : '');

  const handleEdit = () => {
    onEdit(post.id, {
      caption: editedCaption,
      location: editedLocation,
      altText: editedAltText,
      tags: editedTags.split(',').map(tag => tag.trim()),
    });
    setIsEditing(false);
  };

  return (
    <motion.div 
      className="post-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="post-modal-content"
        initial={{ scale: 0.8, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="post-modal-media">
          {post.type === 'image' ? (
            <img src={post.url} alt={post.altText || 'Post image'} />
          ) : (
            <video src={post.url} controls />
          )}
        </div>
        <div className="post-modal-info">
          {isEditing ? (
            <>
              <textarea
                value={editedCaption}
                onChange={(e) => setEditedCaption(e.target.value)}
                placeholder="Caption"
              />
              <input
                type="text"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
                placeholder="Location"
              />
              <input
                type="text"
                value={editedAltText}
                onChange={(e) => setEditedAltText(e.target.value)}
                placeholder="Alt Text"
              />
              <input
                type="text"
                value={editedTags}
                onChange={(e) => setEditedTags(e.target.value)}
                placeholder="Tags (comma separated)"
              />
              <button onClick={handleEdit} className="save-button">Save Changes</button>
            </>
          ) : (
            <>
              <p className="post-caption">{post.caption}</p>
              <p className="post-location">{post.location}</p>
              <p className="post-tags">Tags: {post.tags ? post.tags.join(', ') : 'No tags'}</p>
              <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
            </>
          )}
          <button onClick={() => onDelete(post.id)} className="delete-button">Delete</button>
        </div>
        <button onClick={onClose} className="close-button">
          <i className="fas fa-times"></i>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PostModal;