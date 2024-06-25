import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './editPage.css';

const EditPage = ({ mediaType, mediaPreview, setMediaPreview }) => {
  const [crop, setCrop] = useState({ unit: '%', x: 0, y: 0, width: 100, height: 100 });
  const [croppedImage, setCroppedImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const handleCrop = useCallback((newCrop) => {
    setCrop(newCrop);
  }, []);

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    const canvas = document.createElement('canvas');
    const image = new Image();
    image.src = mediaPreview;
    image.onload = () => {
      const scaleX = image.naturalWidth / canvas.width;
      const scaleY = image.naturalHeight / canvas.height;
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        image,
        croppedAreaPixels.x * scaleX,
        croppedAreaPixels.y * scaleY,
        croppedAreaPixels.width * scaleX,
        croppedAreaPixels.height * scaleY,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      const croppedImageUrl = canvas.toDataURL();
      setCroppedImage(croppedImageUrl);
      setMediaPreview(croppedImageUrl);
    };
  }, [mediaPreview, setMediaPreview]);

  const handleFilterChange = useCallback((filter, value) => {
    switch (filter) {
      case 'brightness':
        setBrightness(value);
        break;
      case 'contrast':
        setContrast(value);
        break;
      case 'saturation':
        setSaturation(value);
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="edit-page">
      <div className="media-preview-container">
        {mediaPreview && mediaType === 'image' && (
          <ReactCrop
            src={mediaPreview}
            crop={crop}
            onChange={handleCrop}
            onComplete={handleCropComplete}
            className="media-preview"
          />
        )}
        {mediaPreview && mediaType === 'video' && (
          <div className="media-preview">
            <video src={mediaPreview} controls />
          </div>
        )}
      </div>
      <div className="edit-actions">
        <div className="filter-controls">
          <label>
            Brightness:
            <input
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={(e) => handleFilterChange('brightness', e.target.value)}
            />
          </label>
          <label>
            Contrast:
            <input
              type="range"
              min="0"
              max="200"
              value={contrast}
              onChange={(e) => handleFilterChange('contrast', e.target.value)}
            />
          </label>
          <label>
            Saturation:
            <input
              type="range"
              min="0"
              max="200"
              value={saturation}
              onChange={(e) => handleFilterChange('saturation', e.target.value)}
            />
          </label>
        </div>
        <button className="apply-filters-button">Apply Filters</button>
      </div>
    </div>
  );
};

export default EditPage;