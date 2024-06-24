import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './newPostModal.css';
import { toast } from 'react-toastify';

const DIMENSIONS = {
  square: { width: 1080, height: 1080 },
  portrait: { width: 1080, height: 1350 },
  landscape: { width: 1080, height: 608 },
};

const Stage1 = ({ mediaType, setMediaType, getRootProps, getInputProps, isDragActive }) => (
  <div className="stage-1">
    <h2>Upload {mediaType}</h2>
    <div className="media-type-selector">
      {['image', 'video'].map(type => (
        <label key={type}>
          <input
            type="radio"
            value={type}
            checked={mediaType === type}
            onChange={(e) => setMediaType(e.target.value)}
          />
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
      ))}
    </div>
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      <p>{isDragActive ? 'Drop the files here ...' : "Drag 'n' drop some files here, or click to select files"}</p>
    </div>
  </div>
);

const Stage2 = ({ mediaType, mediaFile, crop, setCrop, handleCropComplete, handleDimensionChange, setStage }) => (
  <div className="stage-2">
    <h2>Edit {mediaType}</h2>
    <select onChange={handleDimensionChange}>
      <option value="square">Square (1:1)</option>
      <option value="portrait">Portrait (4:5)</option>
      <option value="landscape">Landscape (16:9)</option>
    </select>
    {mediaType === 'image' && mediaFile && (
      <ReactCrop
        src={URL.createObjectURL(mediaFile)}
        crop={crop}
        onChange={(newCrop) => setCrop(newCrop)}
        onComplete={handleCropComplete}
      >
        <img src={URL.createObjectURL(mediaFile)} alt="Preview" />
      </ReactCrop>
    )}
    {mediaType === 'video' && mediaFile && (
      <video src={URL.createObjectURL(mediaFile)} controls />
    )}
    <button onClick={() => setStage(3)}>Next</button>
  </div>
);

const Stage3 = ({ mediaType, mediaFile, croppedImageUrl, postDetails, handleInputChange, handleSubmit }) => (
  <div className="stage-3">
    <h2>Add Details</h2>
    <div className="stage-3-content">
      <div className="media-preview">
        {mediaType === 'image' ? (
          <img src={croppedImageUrl || (mediaFile && URL.createObjectURL(mediaFile))} alt="Preview" />
        ) : (
          <video src={mediaFile && URL.createObjectURL(mediaFile)} controls />
        )}
      </div>
      <div className="post-details">
        <textarea
          name="caption"
          placeholder="Write a caption..."
          value={postDetails.caption}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Add location"
          value={postDetails.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="altText"
          placeholder="Add alt text"
          value={postDetails.altText}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="tags"
          placeholder="Add tags (comma separated)"
          value={postDetails.tags}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Share</button>
      </div>
    </div>
  </div>
);

const Stage4 = () => (
  <div className="stage-4">
    <h2>Uploading Post</h2>
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
    <p>Please wait while we upload your post...</p>
  </div>
);

const NewPostModal = ({ onClose, onSubmit }) => {
  const [stage, setStage] = useState(1);
  const [mediaType, setMediaType] = useState('image');
  const [mediaFile, setMediaFile] = useState(null);
  const [postDetails, setPostDetails] = useState({
    caption: '',
    location: '',
    altText: '',
    tags: '',
  });
  const [crop, setCrop] = useState({ unit: '%', width: 100, height: 100, x: 0, y: 0 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [dimensions, setDimensions] = useState(DIMENSIONS.square);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitTimeoutRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setMediaFile(acceptedFiles[0]);
      setStage(2);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: mediaType === 'image' 
      ? { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] }
      : { 'video/*': ['.mp4', '.mov', '.avi'] },
    maxFiles: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (mediaFile) {
      setIsSubmitting(true);
      setStage(4);
      
      const newPost = {
        type: mediaType,
        file: mediaFile,
        ...postDetails,
        tags: postDetails.tags.split(',').map(tag => tag.trim()),
        dimensions,
        croppedImageUrl
      };

      try {
        await onSubmit(newPost);
        toast.success('Post created successfully!');
        onClose();
      } catch (error) {
        console.error('Error submitting post:', error);
        toast.error('Failed to create post. Please try again.');
        setStage(3);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('Please upload a file');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleDimensionChange = (e) => {
    const newDimensions = DIMENSIONS[e.target.value];
    setDimensions(newDimensions);
    setCrop({ 
      unit: '%', 
      width: 100, 
      height: (newDimensions.height / newDimensions.width) * 100,
      x: 0,
      y: 0
    });
  };

  const handleCropComplete = (crop, percentCrop) => {
    if (mediaFile) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setCroppedImageUrl(reader.result));
      reader.readAsDataURL(mediaFile);
    }
  };

  const renderStage = () => {
    switch (stage) {
      case 1:
        return <Stage1 
          mediaType={mediaType} 
          setMediaType={setMediaType} 
          getRootProps={getRootProps} 
          getInputProps={getInputProps} 
          isDragActive={isDragActive}
        />;
      case 2:
        return <Stage2 
          mediaType={mediaType} 
          mediaFile={mediaFile} 
          crop={crop} 
          setCrop={setCrop} 
          handleCropComplete={handleCropComplete} 
          handleDimensionChange={handleDimensionChange}
          setStage={setStage}
        />;
      case 3:
        return <Stage3 
          mediaType={mediaType} 
          mediaFile={mediaFile} 
          croppedImageUrl={croppedImageUrl} 
          postDetails={postDetails} 
          handleInputChange={handleInputChange} 
          handleSubmit={handleSubmit}
        />;
      case 4:
        return <Stage4 />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
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
          <button onClick={onClose} className="close-button" disabled={isSubmitting}>&times;</button>
          {renderStage()}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewPostModal;