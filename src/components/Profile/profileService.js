import { doc, getDoc, collection, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const fetchUserProfile = async (userId) => {
  console.log('Fetching user profile for:', userId);
  const profileRef = doc(db, 'users', userId);
  const profileDoc = await getDoc(profileRef);

  if (profileDoc.exists()) {
    console.log('Profile found:', profileDoc.data());
    return profileDoc.data();
  } else {
    console.log('Profile not found for user:', userId);
    return null;
  }
};

export const fetchUserMoodEntries = async (userId) => {
  console.log('Fetching mood entries for user:', userId);
  const moodRef = collection(db, 'moodEntries');
  const q = query(moodRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const entries = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log('Mood entries fetched:', entries);
  return entries;
};

export const updateUserProfile = async (userId, profileData) => {
  console.log('Updating user profile:', userId, profileData);
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, profileData);
  console.log('Profile updated successfully');
  const updatedDoc = await getDoc(userRef);
  return updatedDoc.data();
};

export const updateFriendStatus = async (userId, friendId, status) => {
  console.log('Updating friend status:', userId, friendId, status);
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    [`friends.${friendId}`]: status
  });
  console.log('Friend status updated successfully');
};

export const supportUser = async (supporterId, supportedId) => {
  console.log('Supporting user:', supporterId, supportedId);
  const supportedUserRef = doc(db, 'users', supportedId);
  await updateDoc(supportedUserRef, {
    supportNetwork: arrayUnion(supporterId)
  });
  console.log('User supported successfully');
};