// Display.js
import React, { useEffect, useState } from 'react';
import './display.css';
import Header from './Header';
import Gallery from './Gallery';
import Navbar from '../Routes/Navbar';
import { useUserContext } from '../User/UserContext';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, storage, ref, uploadBytesResumable, getDownloadURL } from '../../firebase/firebase';
import NewPostModal from './NewPostModal';
import PostModal from './PostModal';

const Display = () => {
  const { user } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        console.log('Fetching posts for user:', user.uid);
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
        console.log('Fetched posts:', fetchedPosts);
      }
    };

    fetchPosts();
  }, [user]);

  const handleNewPostClick = () => {
    console.log('Opening new post modal');
    setIsNewPostModalOpen(true);
  };

  const handleNewPostModalClose = () => {
    console.log('Closing new post modal');
    setIsNewPostModalOpen(false);
  };

  const handleNewPostSubmit = async (newPost) => {
    try {
      console.log('Creating new post:', newPost);
      const fileUrl = await uploadFile(newPost.file);
      const postData = {
        type: newPost.type,
        caption: newPost.caption,
        location: newPost.location,
        altText: newPost.altText,
        url: fileUrl,
        userId: user.uid,
        createdAt: new Date(),
      };
      const postsRef = collection(db, 'posts');
      const docRef = await addDoc(postsRef, postData);
      setPosts([...posts, { id: docRef.id, ...postData }]);
      console.log('New post created successfully');
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  };

  const uploadFile = async (file) => {
    console.log('Uploading file:', file);
    const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      const snapshot = await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error('Error uploading file:', error);
            reject(error);
          },
          () => {
            console.log('Upload completed');
            resolve(uploadTask.snapshot);
          }
        );
      });

      const fileUrl = await getDownloadURL(snapshot.ref);
      console.log('File uploaded successfully!', fileUrl);
      return fileUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handlePostClick = (post) => {
    console.log('Selected post:', post);
    setSelectedPost(post);
  };

  const handlePostModalClose = () => {
    console.log('Closing post modal');
    setSelectedPost(null);
  };

  const handleDeletePost = async (postId) => {
    try {
      console.log('Deleting post with ID:', postId);
      await deleteDoc(doc(db, 'posts', postId));
      setPosts(posts.filter((post) => post.id !== postId));
      console.log('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="display-container">
        <Header user={user} posts={posts} onNewPostClick={handleNewPostClick} />
        <Gallery posts={posts} onPostClick={handlePostClick} onDeletePost={handleDeletePost} />
        {isNewPostModalOpen && (
          <NewPostModal
            onClose={handleNewPostModalClose}
            onSubmit={handleNewPostSubmit}
          />
        )}
        {selectedPost && (
          <PostModal post={selectedPost} onClose={handlePostModalClose} />
        )}
      </div>
    </>
  );
};

export default Display;