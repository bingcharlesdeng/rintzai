import React from 'react';
import './gallery.css';
import Post from './Post';

const Gallery = ({ posts }) => {
  return (
    <div className="gallery">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Gallery;