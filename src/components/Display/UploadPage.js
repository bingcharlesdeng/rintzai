// UploadPage.js
import React from 'react';
import './uploadPage.css';

const UploadPage = ({ mediaType, setMediaType, onFileUpload, mediaPreview }) => {
  const handleMediaTypeChange = (e) => {
    setMediaType(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file);
    onFileUpload(file);
  };

  return (
    <div className="upload-page">
      <div className="media-type-selector">
        <label>
          <input
            type="radio"
            value="image"
            checked={mediaType === 'image'}
            onChange={handleMediaTypeChange}
          />
          Image
        </label>
        <label>
          <input
            type="radio"
            value="video"
            checked={mediaType === 'video'}
            onChange={handleMediaTypeChange}
          />
          Video
        </label>
      </div>
      <div className="media-upload">
        <label htmlFor="file-upload" className="file-upload-label">
          <i className="fas fa-cloud-upload-alt"></i> Select File
        </label>
        <input
          id="file-upload"
          type="file"
          accept={mediaType === 'image' ? 'image/*' : 'video/*'}
          onChange={handleFileUpload}
        />
      </div>
      {mediaPreview && (
        <div className="media-preview-container">
          {mediaType === 'image' && (
            <img src={mediaPreview} alt="Media Preview" className="media-preview" />
          )}
          {mediaType === 'video' && (
            <video src={mediaPreview} controls className="media-preview"></video>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadPage;