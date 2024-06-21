import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const updateUserProfile = async (userId, profileData) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, profileData);
  const updatedDoc = await getDoc(userRef);
  return updatedDoc.data();
};

export const updateFriendStatus = async (userId, friendId, status) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    [`friends.${friendId}`]: status
  });
};

export const supportUser = async (supporterId, supportedId) => {
  const supportedUserRef = doc(db, 'users', supportedId);
  await updateDoc(supportedUserRef, {
    supportNetwork: arrayUnion(supporterId)
  });
};