import React from 'react';
import { useDropzone } from 'react-dropzone';
import './uploadPage.css';

const UploadPage = ({ mediaType, setMediaType, onFileUpload, mediaPreview }) => {
  const handleMediaTypeChange = (e) => {
    setMediaType(e.target.value);
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      console.log('File selected:', acceptedFiles[0]);
      onFileUpload(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: mediaType === 'image' 
      ? { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] }
      : { 'video/*': ['.mp4', '.mov', '.avi'] },
    maxFiles: 1
  });

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
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <p>{isDragActive ? 'Drop the files here ...' : "Drag 'n' drop some files here, or click to select files"}</p>
      </div>
      {mediaPreview && (
        <div className="media-preview-container">
          {mediaType === 'image' ? (
            <img src={mediaPreview} alt="Media Preview" className="media-preview" />
          ) : (
            <video src={mediaPreview} controls className="media-preview"></video>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadPage;