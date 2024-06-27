import { db, doc, getDoc, setDoc, updateDoc } from '../../firebase/firebase';

export const fetchUserDBTData = async (userId) => {
  try {
    const userDocRef = doc(db, 'userDBT', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    } else {
      // If the document doesn't exist, create it with default values
      const defaultData = {
        completedSkills: {},
        completedExercises: [],
        diaryEntries: [],
      };
      await setDoc(userDocRef, defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error('Error fetching user DBT data:', error);
    throw error;
  }
};

export const updateUserDBTData = async (userId, newData) => {
  try {
    const userDocRef = doc(db, 'userDBT', userId);
    await updateDoc(userDocRef, newData);
  } catch (error) {
    console.error('Error updating user DBT data:', error);
    throw error;
  }
};