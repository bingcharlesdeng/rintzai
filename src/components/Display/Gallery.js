import React from 'react';
import './gallery.css';

const Gallery = ({ posts, onPostClick }) => {
  return (
    <div className="gallery">
      {posts.map((post) => (
        <div key={post.id} className="gallery-item" onClick={() => onPostClick(post)}>
          <div className="gallery-item-image">
            {post.type === 'image' ? (
              <img src={post.url} alt={post.altText || 'Post image'} loading="lazy" />
            ) : (
              <video src={post.url} />
            )}
          </div>
          <div className="gallery-item-overlay">
            <p className="gallery-item-caption">{post.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;