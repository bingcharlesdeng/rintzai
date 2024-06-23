import React from 'react';
import './gallery.css';
import { motion } from 'framer-motion';

const Gallery = React.memo(({ posts, onPostClick, onDeletePost, onEditPost }) => {
  return (
    <div className="gallery">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          className="gallery-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {post.type === 'image' ? (
            <img
              src={post.url}
              alt={post.altText || 'Post image'}
              onClick={() => onPostClick(post)}
              className="gallery-image"
              loading="lazy"
            />
          ) : (
            <video
              src={post.url}
              onClick={() => onPostClick(post)}
              className="gallery-video"
              preload="metadata"
            />
          )}
          <div className="gallery-item-info">
            <span className="gallery-item-caption">{post.caption}</span>
            <div className="gallery-item-actions">
              <button onClick={(e) => {e.stopPropagation(); onEditPost(post.id, post);}} aria-label="Edit post">
                <i className="fas fa-edit"></i>
              </button>
              <button onClick={(e) => {e.stopPropagation(); onDeletePost(post.id);}} aria-label="Delete post">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
});

export default Gallery;