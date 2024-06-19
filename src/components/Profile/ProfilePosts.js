import React from 'react';
import './profilePosts.css';

const ProfilePosts = ({ posts }) => {
  console.log('ProfilePosts rendered');
  console.log('posts:', posts);

  return (
    <div className="profile-posts">
      <h2 className="section-title">Posts</h2>
      {posts && posts.length > 0 ? (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <p className="post-content">{post.content}</p>
              <div className="post-actions">
                <button className="like-button">Like</button>
                <button className="comment-button">Comment</button>
                <button className="share-button">Share</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-posts">No posts available.</p>
      )}
    </div>
  );
};

export default ProfilePosts;