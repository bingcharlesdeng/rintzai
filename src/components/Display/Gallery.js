import React from 'react';
import './gallery.css';
import Post from './Post';

const Gallery = ({ posts, onPostClick, onDeletePost }) => {
  console.log('Rendering Gallery with posts:', posts);

  return (
    <div className="gallery">
      {posts.map((post) => (
        <div key={post.id} className="gallery-item">
          <Post post={post} onClick={() => onPostClick(post)} onDeletePost={() => onDeletePost(post.id)} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;