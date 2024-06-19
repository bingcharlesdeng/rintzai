// NewPostModal.js
import React, { useState } from 'react';
import UploadPage from './UploadPage';
import DetailsPage from './DetailsPage';
import './newPostModal.css';

const NewPostModal = ({ onClose, onSubmit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mediaType, setMediaType] = useState('image');
  const [mediaFile, setMediaFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [altText, setAltText] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleNext = () => {
    if (currentPage === 1 && !mediaFile) {
      console.log('Please upload a file before proceeding');
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSubmit = async () => {
    if (mediaFile) {
      setIsUploading(true);
      const newPost = {
        type: mediaType,
        file: mediaFile,
        caption,
        location,
        altText,
      };
      console.log('Submitting new post:', newPost);
      await onSubmit(newPost);
      setIsUploading(false);
      onClose();
    } else {
      console.log('No file uploaded');
    }
  };

  const handleFileUpload = (file) => {
    console.log('File uploaded:', file);
    setMediaFile(file);
  };

  return (
    <div className="modal-overlay">
      <div className="new-post-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create New Post</h2>
            <button className="close-button" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          {isUploading ? (
            <div className="loading-spinner-container">
                <div className="spinner"></div>
                <p>Uploading...</p>
            </div>
          ) : (
            <div className="modal-body">
              {currentPage === 1 && (
                <UploadPage
                  mediaType={mediaType}
                  setMediaType={setMediaType}
                  onFileUpload={handleFileUpload}
                />
              )}
              {currentPage === 2 && (
                <DetailsPage
                  caption={caption}
                  setCaption={setCaption}
                  location={location}
                  setLocation={setLocation}
                  altText={altText}
                  setAltText={setAltText}
                />
              )}
            </div>
          )}
          <div className="modal-footer">
            {!isUploading && currentPage > 1 && (
              <button className="prev-button" onClick={handlePrev}>
                <i className="fas fa-chevron-left"></i> Prev
              </button>
            )}
            {!isUploading && currentPage < 2 && (
              <button className="next-button" onClick={handleNext}>
                Next <i className="fas fa-chevron-right"></i>
              </button>
            )}
            {!isUploading && currentPage === 2 && (
              <button className="submit-button" onClick={handleSubmit}>
                Share
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;