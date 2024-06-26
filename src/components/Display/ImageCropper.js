import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './imageCropper.css';
const ImageCropper = ({ imageFile, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ unit: '%', width: 100, height: 100, x: 0, y: 0 });
  const [image, setImage] = useState(null);

  const onLoad = useCallback((img) => {
    setImage(img);
  }, []);

  const handleCropComplete = useCallback(async () => {
    if (image && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        onCropComplete(blob);
      }, 'image/jpeg', 1);
    }
  }, [crop, image, onCropComplete]);

  return (
    <div className="image-cropper">
      <ReactCrop
        src={URL.createObjectURL(imageFile)}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(newCrop) => setCrop(newCrop)}
        circularCrop
      />
      <div className="cropper-buttons">
        <button onClick={handleCropComplete}>Apply</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ImageCropper;