import React, { useState, useEffect, useCallback } from 'react';
import './display.css';
import Header from './Header';
import Gallery from './Gallery';
import Navbar from '../Routes/Navbar';
import { useUserContext } from '../User/UserContext';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc, orderBy, limit, startAfter } from 'firebase/firestore';
import { db, storage, ref, uploadBytesResumable, getDownloadURL } from '../../firebase/firebase';
import NewPostModal from './NewPostModal';
import PostModal from './PostModal';
import LoadingSpinner from './LoadingSpinner';
import { toast } from 'react-toastify';

const Display = () => {
  const { user } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    if (user && hasMore) {
      setIsLoading(true);
      try {
        const postsRef = collection(db, 'posts');
        let q = query(
          postsRef,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc'),
          limit(12)
        );

        if (lastVisible) {
          q = query(q, startAfter(lastVisible));
        }

        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasMore(querySnapshot.docs.length === 12);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts. Please try again.');
        setIsLoading(false);
      }
    }
  }, [user, hasMore, lastVisible]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleNewPostClick = () => setIsNewPostModalOpen(true);
  const handleNewPostModalClose = () => setIsNewPostModalOpen(false);

  const handleNewPostSubmit = async (newPost) => {
    try {
      setIsLoading(true);
      const fileUrl = await uploadFile(newPost.file);
      const postData = {
        type: newPost.type,
        caption: newPost.caption,
        location: newPost.location,
        altText: newPost.altText,
        url: fileUrl,
        userId: user.uid,
        createdAt: new Date(),
        tags: newPost.tags,
      };
      const docRef = await addDoc(collection(db, 'posts'), postData);
      setPosts(prevPosts => [{ id: docRef.id, ...postData }, ...prevPosts]);
      setIsNewPostModalOpen(false);
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating new post:', error);
      toast.error('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (file) => {
    const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
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
        async () => {
          try {
            const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(fileUrl);
          } catch (error) {
            console.error('Error getting download URL:', error);
            reject(error);
          }
        }
      );
    });
  };

  const handlePostClick = (post) => setSelectedPost(post);
  const handlePostModalClose = () => setSelectedPost(null);

  const handleDeletePost = async (postId) => {
    try {
      setIsLoading(true);
      await deleteDoc(doc(db, 'posts', postId));
      setPosts(posts.filter((post) => post.id !== postId));
      toast.success('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPost = async (postId, updatedData) => {
    try {
      setIsLoading(true);
      await updateDoc(doc(db, 'posts', postId), updatedData);
      setPosts(posts.map((post) => post.id === postId ? { ...post, ...updatedData } : post));
      toast.success('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && posts.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="display-container">
        <Header user={user} posts={posts} onNewPostClick={handleNewPostClick} />
        <Gallery 
          posts={posts} 
          onPostClick={handlePostClick} 
          onDeletePost={handleDeletePost}
          onEditPost={handleEditPost}
        />
        {hasMore && (
          <button onClick={fetchPosts} className="load-more-button">
            Load more
          </button>
        )}
        {isNewPostModalOpen && (
          <NewPostModal
            onClose={handleNewPostModalClose}
            onSubmit={handleNewPostSubmit}
          />
        )}
        {selectedPost && (
          <PostModal 
            post={selectedPost} 
            onClose={handlePostModalClose}
            onDelete={handleDeletePost}
            onEdit={handleEditPost}
          />
        )}
      </div>
    </>
  );
};

export default Display;