import React, { useEffect, useState } from 'react';
import './display.css';
import Header from './Header';
import Gallery from './Gallery';
import Navbar from '../Navbar';
import { useUserContext } from '../UserContext';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import defaultAvatar from '../../assets/default-avatar.png';
import NewPostModal from './NewPostModal';

const Display = () => {
  const { user } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
        console.log('Posts fetched:', fetchedPosts);
      }
    };

    fetchPosts();
  }, [user]);

  const handleNewPostClick = () => {
    setIsNewPostModalOpen(true);
  };

  const handleNewPostModalClose = () => {
    setIsNewPostModalOpen(false);
  };

  const handleNewPostSubmit = async (newPost) => {
    try {
      const postsRef = collection(db, 'posts');
      await addDoc(postsRef, { ...newPost, userId: user.uid });
      console.log('New post created:', newPost);
      setIsNewPostModalOpen(false);
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="display-container">
        <Header user={user} posts={posts} />
        <Gallery posts={posts} />
        <div className="new-post-button-container">
          <button className="new-post-button" onClick={handleNewPostClick}>
            <i className="fas fa-plus"></i> New Post
          </button>
        </div>
        {isNewPostModalOpen && (
          <NewPostModal
            onClose={handleNewPostModalClose}
            onSubmit={handleNewPostSubmit}
          />
        )}
      </div>
    </>
  );
};

export default Display;