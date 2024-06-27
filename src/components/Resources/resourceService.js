import { db, collection, getDocs, query, where, addDoc, updateDoc, doc } from '../../firebase/firebase';

export const fetchResources = async () => {
  try {
    const resourcesRef = collection(db, 'resources');
    const querySnapshot = await getDocs(resourcesRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

export const fetchUserBookmarks = async (userId) => {
  try {
    const bookmarksRef = collection(db, 'bookmarks');
    const q = query(bookmarksRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data().resourceId);
  } catch (error) {
    console.error('Error fetching user bookmarks:', error);
    throw error;
  }
};

export const toggleBookmark = async (userId, resourceId) => {
  try {
    const bookmarksRef = collection(db, 'bookmarks');
    const q = query(bookmarksRef, where('userId', '==', userId), where('resourceId', '==', resourceId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Add bookmark
      await addDoc(bookmarksRef, { userId, resourceId });
    } else {
      // Remove bookmark
      const bookmarkDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, 'bookmarks', bookmarkDoc.id), { userId, resourceId });
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    throw error;
  }
};