import React, { useState } from 'react';
import './newPostModal.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

const NewPostModal = ({ onClose, onSubmit }) => {
  const [mediaType, setMediaType] = useState('image');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');

  const handleMediaTypeChange = (e) => {
    setMediaType(e.target.value);
    setMediaFile(null);
    setMediaPreview(null);
  };

  const handleMediaFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);

      // Upload the file to Firebase Storage and get the download URL
      const storageRef = ref(storage, `posts/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setMediaPreview(downloadURL);
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleAspectRatioChange = (e) => {
    setAspectRatio(e.target.value);
  };

  const handleSubmit = () => {
    if (mediaFile && mediaPreview) {
      const newPost = {
        type: mediaType,
        url: mediaPreview,
        caption,
        aspectRatio,
      };
      onSubmit(newPost);
    }
  };

  return (
    <div className="new-post-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>New Post</h2>
        <div className="media-type-selector">
          <label>
            <input
              type="radio"
              name="mediaType"
              value="image"
              checked={mediaType === 'image'}
              onChange={handleMediaTypeChange}
            />
            Image
          </label>
          <label>
            <input
              type="radio"
              name="mediaType"
              value="video"
              checked={mediaType === 'video'}
              onChange={handleMediaTypeChange}
            />
            Video
          </label>
        </div>
        <div className="media-upload">
          <input
            type="file"
            accept={mediaType === 'image' ? 'image/*' : 'video/*'}
            onChange={handleMediaFileChange}
          />
          {mediaPreview && (
            <div className="media-preview-container">
              <div
                className={`media-preview ${
                  aspectRatio === '16:9'
                    ? 'aspect-ratio-16-9'
                    : aspectRatio === '9:16'
                    ? 'aspect-ratio-9-16'
                    : 'aspect-ratio-1-1'
                }`}
              >
                {mediaType === 'image' ? (
                  <img src={mediaPreview} alt="Media Preview" />
                ) : (
                  <video src={mediaPreview} controls />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="aspect-ratio-selector">
          <label>
            <input
              type="radio"
              name="aspectRatio"
              value="16:9"
              checked={aspectRatio === '16:9'}
              onChange={handleAspectRatioChange}
            />
            16:9
          </label>
          <label>
            <input
              type="radio"
              name="aspectRatio"
              value="9:16"
              checked={aspectRatio === '9:16'}
              onChange={handleAspectRatioChange}
            />
            9:16
          </label>
          <label>
            <input
              type="radio"
              name="aspectRatio"
              value="1:1"
              checked={aspectRatio === '1:1'}
              onChange={handleAspectRatioChange}
            />
            1:1
          </label>
        </div>
        <div className="caption-input">
          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={handleCaptionChange}
          />
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default NewPostModal;