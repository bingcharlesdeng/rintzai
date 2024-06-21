import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const updateUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, profileData);
    const updatedDoc = await getDoc(userRef);
    return updatedDoc.data();
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const updateFriendStatus = async (userId, friendId, status) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      [`friends.${friendId}`]: status
    });
    console.log('Friend status updated successfully');
  } catch (error) {
    console.error('Error updating friend status:', error);
    throw error;
  }
};

export const supportUser = async (supporterId, supportedId) => {
  try {
    const supportedUserRef = doc(db, 'users', supportedId);
    await updateDoc(supportedUserRef, {
      supportNetwork: arrayUnion(supporterId)
    });
    console.log('User supported successfully');
  } catch (error) {
    console.error('Error supporting user:', error);
    throw error;
  }
};

export const createUserInDB = async (user) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userData = {
      userId: user.uid,
      email: user.email,
      name: user.displayName || '',
      avatarUrl: user.photoURL || '',
      createdAt: new Date(),
    };
    await setDoc(userRef, userData, { merge: true });
    console.log('User created in database:', userData);
  } catch (error) {
    console.error('Error creating user in database:', error);
    throw error;
  }
};

// You can add more user-related functions here as needed