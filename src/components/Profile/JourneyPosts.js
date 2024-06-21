import React, { useState } from 'react';
import './journeyPosts.css';

const JourneyPosts = ({ posts, onProfileUpdate }) => {
  const [newPost, setNewPost] = useState('');

  const handleAddPost = () => {
    if (newPost.trim()) {
      const updatedPosts = [
        { id: Date.now(), content: newPost, date: new Date().toISOString() },
        ...(posts || [])
      ];
      onProfileUpdate({ journeyPosts: updatedPosts });
      setNewPost('');
    }
  };

  return (
    <div className="journey-posts">
      <h2>My Recovery Journey</h2>
      <div className="add-post">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your journey..."
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
      {posts && posts.length > 0 ? (
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <p>{post.content}</p>
              <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
              </li>
          ))}
        </ul>
      ) : (
        <p>No journey posts yet. Start sharing your experiences!</p>
      )}
    </div>
  );
};

export default JourneyPosts;