import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebase/firebase';
import imageCompression from 'browser-image-compression';

export const fetchUserProfile = async (userId) => {
  const profileRef = doc(db, 'users', userId);
  const profileDoc = await getDoc(profileRef);

  if (profileDoc.exists()) {
    return profileDoc.data();
  } else {
    return null;
  }
};

export const updateUserProfile = async (userId, profileData) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, profileData);
  const updatedDoc = await getDoc(userRef);
  return updatedDoc.data();
};

export const uploadAvatar = async (userId, file) => {
  const storage = getStorage();
  const avatarRef = ref(storage, `avatars/${userId}`);

  const compressedFile = await imageCompression(file, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 400,
    useWebWorker: true
  });

  await uploadBytes(avatarRef, compressedFile);
  const downloadURL = await getDownloadURL(avatarRef);

  return downloadURL;
};