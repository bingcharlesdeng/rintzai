import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './editPage.css';

const EditPage = ({ mediaType, mediaPreview, setMediaPreview }) => {
  const [crop, setCrop] = useState({ unit: '%', x: 0, y: 0, width: 100, height: 100 });
  const [croppedImage, setCroppedImage] = useState(null);

  const handleCrop = (crop) => {
    setCrop(crop);
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
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
    };
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
        {/* Add filters and other editing options here */}
        </div>
        </div>
        );
        };
        export default EditPage;