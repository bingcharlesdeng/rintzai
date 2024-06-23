import React, { useState } from 'react';
import './newPostModal.css';
import { motion } from 'framer-motion';

const NewPostModal = ({ onClose, onSubmit }) => {
  const [mediaType, setMediaType] = useState('image');
  const [mediaFile, setMediaFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [altText, setAltText] = useState('');
  const [tags, setTags] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMediaFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mediaFile) {
      const newPost = {
        type: mediaType,
        file: mediaFile,
        caption,
        location,
        altText,
        tags: tags.split(',').map(tag => tag.trim()),
      };
      await onSubmit(newPost);
    } else {
      alert('Please upload a file');
    }
  };

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="new-post-modal"
        initial={{ scale: 0.8, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="media-type-selector">
            <label>
              <input
                type="radio"
                value="image"
                checked={mediaType === 'image'}
                onChange={(e) => setMediaType(e.target.value)}
              />
              Image
            </label>
            <label>
              <input
                type="radio"
                value="video"
                checked={mediaType === 'video'}
                onChange={(e) => setMediaType(e.target.value)}
              />
              Video
            </label>
          </div>
          <div className="file-input-container">
            <input
              type="file"
              accept={mediaType === 'image' ? 'image/*' : 'video/*'}
              onChange={handleFileChange}
              id="file-input"
            />
            <label htmlFor="file-input" className="file-input-label">
              Choose {mediaType}
            </label>
          </div>
          {mediaFile && <p className="file-name">{mediaFile.name}</p>}
          <textarea
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Alt Text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <div className="modal-actions">
            <button type="submit" className="submit-button">Create Post</button>
            <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default NewPostModal;