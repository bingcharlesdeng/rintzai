import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageCompression from 'browser-image-compression';
import './display.css';
import Header from './Header';
import Navbar from '../Routes/Navbar';
import { useUserContext } from '../User/UserContext';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc, orderBy, limit, startAfter, getDoc } from 'firebase/firestore';
import { db, storage, ref, uploadBytesResumable, getDownloadURL, arrayUnion } from '../../firebase/firebase';
import NewPostModal from './NewPostModal';
import PostModal from './PostModal';
import LoadingSpinner from './LoadingSpinner';
import SearchBar from './SearchBar';
import { updateUserProfile, fetchUserProfile } from './profileService';

const Gallery = lazy(() => import('./Gallery'));

const Display = () => {
  const { user, setUser } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [avatarUpdateSuccess, setAvatarUpdateSuccess] = useState(false);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);

  const fetchPosts = useCallback(async () => {
    if (user && hasMore && isAvatarLoaded) {
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

        setPosts((prevPosts) => {
          const newPosts = fetchedPosts.filter(
            (newPost) => !prevPosts.some((prevPost) => prevPost.id === newPost.id)
          );
          return [...prevPosts, ...newPosts];
        });
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasMore(querySnapshot.docs.length === 12);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  }, [user, hasMore, lastVisible, isAvatarLoaded]);

  useEffect(() => {
    if (isAvatarLoaded) {
      fetchPosts();
    }
  }, [fetchPosts, isAvatarLoaded]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.uid) {
        try {
          const userData = await fetchUserProfile(user.uid);
          if (userData && userData.photoURL) {
            setUser(prevUser => ({ ...prevUser, photoURL: userData.photoURL }));
          }
          setIsAvatarLoaded(true);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setIsAvatarLoaded(true);
        }
      }
    };
    fetchUserData();
  }, [user, setUser]);

  const handleNewPostClick = () => setIsNewPostModalOpen(true);
  const handleNewPostModalClose = () => setIsNewPostModalOpen(false);

  const handleNewPostSubmit = async (newPost) => {
    try {
      setIsLoading(true);
      const compressedFile = await imageCompression(newPost.file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920
      });
      const fileUrl = await uploadFile(compressedFile);
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

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };
  
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
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, updatedData);
      setPosts(posts.map((post) => 
        post.id === postId ? { ...post, ...updatedData } : post
      ));
      toast.success('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async (postId, comment) => {
    try {
      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);
      
      if (!postDoc.exists()) {
        console.error('Post does not exist:', postId);
        return;
      }
  
      await updateDoc(postRef, {
        comments: arrayUnion(comment)
      });
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      ));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  const handleAddTag = async (postId, tag) => {
    try {
      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);
      
      if (!postDoc.exists()) {
        console.error('Post does not exist:', postId);
        return;
      }
  
      await updateDoc(postRef, {
        tags: arrayUnion(tag)
      });
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, tags: [...(post.tags || []), tag] }
          : post
      ));
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleAvatarUpdate = async (newAvatarUrl) => {
    try {
      await updateUserProfile(user.uid, { photoURL: newAvatarUrl });
      setUser(prevUser => ({
        ...prevUser,
        photoURL: newAvatarUrl
      }));
      if (!avatarUpdateSuccess) {
        setAvatarUpdateSuccess(true);
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
      toast.error('Failed to update avatar. Please try again.');
    }
  };

  const filteredPosts = posts.filter(post => 
    post.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    
    <div className="display-container">
      <div className="display-content">
        <div className="display-sidebar">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="display-main">
        <Header 
            user={user} 
            posts={posts} 
            onNewPostClick={handleNewPostClick}
            onAvatarUpdate={handleAvatarUpdate}
            isAvatarLoaded={isAvatarLoaded}
          />
          {isAvatarLoaded && (
            <Suspense fallback={<LoadingSpinner />}>
              <Gallery 
                posts={filteredPosts} 
                onPostClick={handlePostClick}
              />
            </Suspense>
          )}
          {hasMore && isAvatarLoaded && (
            <button onClick={fetchPosts} className="load-more-button">
              Load more
            </button>
          )}
        </div>
      </div>
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
          addComment={handleAddComment}
          addTag={handleAddTag}
        />
      )}
      <ToastContainer position="bottom-right" limit={1} />
    </div>

    
  );
};

export default Display;