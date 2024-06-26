import React, { useState, useRef, useEffect } from 'react';
import './header.css';
import { uploadAvatar, fetchUserProfile, updateUserProfile } from './profileService';
import defaultAvatar from '../../assets/default-avatar.png';
import LoadingSpinner from './LoadingSpinner';
import ImageCropper from './ImageCropper';

const Header = ({ user, posts, onNewPostClick, onAvatarUpdate, isAvatarLoaded }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const postCount = posts.length;
  const likeCount = posts.reduce((total, post) => total + (post.likes || 0), 0);
  const commentCount = posts.reduce((total, post) => total + (post.comments ? post.comments.length : 0), 0);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.uid && !isAvatarLoaded) {
        try {
          const userData = await fetchUserProfile(user.uid);
          if (userData && userData.photoURL) {
            onAvatarUpdate(userData.photoURL);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setAvatarError(true);
        }
      }
    };
    fetchUserData();
  }, [user, onAvatarUpdate, isAvatarLoaded]);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setShowCropper(true);
    }
  };

  const handleCroppedImage = async (croppedImage) => {
    setIsUploading(true);
    setShowCropper(false);
    try {
      const avatarUrl = await uploadAvatar(user.uid, croppedImage);
      await updateUserProfile(user.uid, { photoURL: avatarUrl });
      onAvatarUpdate(avatarUrl);
      setAvatarError(false);
    } catch (error) {
      console.error('Error in handleCroppedImage:', error);
      setAvatarError(true);
    } finally {
      setIsUploading(false);
    }
  };

  const avatarSrc = user.photoURL || defaultAvatar;

  return (
    <header className="header">
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-count">{postCount}</span>
          <span className="stat-label">Posts</span>
        </div>
        <div className="stat-item">
          <span className="stat-count">{likeCount}</span>
          <span className="stat-label">Likes</span>
        </div>
        <div className="stat-item">
          <span className="stat-count">{commentCount}</span>
          <span className="stat-label">Comments</span>
        </div>
      </div>
      <div className="user-info">
        <div 
          className="avatar-container"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handleAvatarClick}
        >
          {!isAvatarLoaded || isUploading ? (
            <LoadingSpinner size="small" />
          ) : (
            <img 
              src={avatarSrc}
              alt={user.displayName}
              className="user-avatar"
              onError={() => setAvatarError(true)}
            />
          )}
          {(isHovering && !isUploading && isAvatarLoaded) && (
            <div className="avatar-overlay">Click to change</div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
        <div className="user-details">
          <h1>{user.displayName}</h1>
          <p>{user.email}</p>
          <div className="user-bio">{user.bio || 'No bio provided'}</div>
        </div>
      </div>
      <div className="action-container">
        <button onClick={onNewPostClick} className="new-post-button">
          <i className="fas fa-plus"></i> New Post
        </button>
      </div>
      {showCropper && (
        <ImageCropper
          imageFile={imageFile}
          onCropComplete={handleCroppedImage}
          onCancel={() => setShowCropper(false)}
        />
      )}
    </header>
  );
};

export default Header;