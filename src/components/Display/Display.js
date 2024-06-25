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

const Gallery = lazy(() => import('./Gallery'));

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
        console.log('Fetching posts for user:', user.uid);
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

        console.log('Fetched posts:', fetchedPosts);

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
  }, [user, hasMore, lastVisible]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleNewPostClick = () => setIsNewPostModalOpen(true);
  const handleNewPostModalClose = () => setIsNewPostModalOpen(false);

  const handleNewPostSubmit = async (newPost) => {
    try {
      setIsLoading(true);
      console.log('Submitting new post:', newPost);
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
      console.log('New post added with ID:', docRef.id);
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
            console.log('File uploaded successfully. URL:', fileUrl);
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
    console.log('Post clicked:', post);
    console.log('Post ID:', post.id); // Log the post ID for debugging
    setSelectedPost(post);
  };
  const handlePostModalClose = () => setSelectedPost(null);

  const handleDeletePost = async (postId) => {
    try {
      setIsLoading(true);
      console.log('Deleting post:', postId);
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
      console.log('Editing post:', postId, 'with data:', updatedData);
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
      console.log('Adding comment to post:', postId, 'Comment:', comment);
      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);
      
      if (!postDoc.exists()) {
        console.error('Post does not exist:', postId);
        toast.error('Failed to add comment. Post not found.');
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
      toast.success('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment. Please try again.');
    }
  };
  
  const handleAddTag = async (postId, tag) => {
    try {
      console.log('Adding tag to post:', postId, 'Tag:', tag);
      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);
      
      if (!postDoc.exists()) {
        console.error('Post does not exist:', postId);
        toast.error('Failed to add tag. Post not found.');
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
      toast.success('Tag added successfully!');
    } catch (error) {
      console.error('Error adding tag:', error);
      toast.error('Failed to add tag. Please try again.');
    }
  };

  // if (isLoading && posts.length === 0) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="display-container">
      <Navbar />
      <Header user={user} posts={posts} onNewPostClick={handleNewPostClick} />
      <Suspense fallback={<LoadingSpinner />}>
        <Gallery 
          posts={posts} 
          onPostClick={handlePostClick}
        />
      </Suspense>
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
          addComment={handleAddComment}
          addTag={handleAddTag}
        />
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Display;