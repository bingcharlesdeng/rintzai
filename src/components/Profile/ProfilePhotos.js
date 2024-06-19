import React from 'react';
import './profilePhotos.css';

const ProfilePhotos = ({ photos }) => {
  console.log('ProfilePhotos rendered');
  console.log('photos:', photos);

  return (
    <div className="profile-photos">
      <h2 className="section-title">Photos</h2>
      {photos && photos.length > 0 ? (
        <div className="photo-grid">
          {photos.map((photo) => (
            <img key={photo.id} src={photo.url} alt="Profile photo" className="photo-item" />
          ))}
        </div>
      ) : (
        <p className="no-photos">No photos available.</p>
      )}
    </div>
  );
};

export default ProfilePhotos;