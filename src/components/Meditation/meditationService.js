import { db, collection, getDocs, query, where, addDoc, updateDoc, doc } from '../../firebase/firebase';

export const fetchMeditations = async () => {
  try {
    const meditationsRef = collection(db, 'meditations');
    const querySnapshot = await getDocs(meditationsRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching meditations:', error);
    throw error;
  }
};

export const fetchUserMeditationData = async (userId) => {
  try {
    const userMeditationRef = collection(db, 'userMeditations');
    const q = query(userMeditationRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    return querySnapshot.docs[0].data();
  } catch (error) {
    console.error('Error fetching user meditation data:', error);
    throw error;
  }
};

export const updateUserMeditationData = async (userId, meditationData) => {
  try {
    const userMeditationRef = collection(db, 'userMeditations');
    const q = query(userMeditationRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      await addDoc(userMeditationRef, { userId, ...meditationData });
    } else {
      const docRef = doc(db, 'userMeditations', querySnapshot.docs[0].id);
      await updateDoc(docRef, meditationData);
    }
  } catch (error) {
    console.error('Error updating user meditation data:', error);
    throw error;
  }
};