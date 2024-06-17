// ProfileFeed.js
import React, { useState, useEffect } from 'react';
import './profileFeed.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUserContext } from '../UserContext';

const ProfileFeed = ({ profile }) => {
  const { user } = useUserContext();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user) {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      }
    };

    fetchUserPosts();
  }, [user]);

  return (
    <div className="profile-feed">
      <h3 className="section-title">Activity Feed</h3>
      {posts.length > 0 ? (
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
        <p className="no-posts">No posts to display.</p>
      )}
    </div>
  );
};

export default ProfileFeed;