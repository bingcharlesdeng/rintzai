import { db, doc, getDoc, setDoc, updateDoc } from '../../firebase/firebase';

export const fetchUserCBTData = async (userId) => {
  try {
    const userDocRef = doc(db, 'userCBT', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    } else {
      // If the document doesn't exist, create it with default values
      const defaultData = {
        thoughtRecords: [],
        distortionExamples: [],
        beliefChallenges: [],
        exerciseEntries: [],
        moodEntries: [],
      };
      await setDoc(userDocRef, defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error('Error fetching user CBT data:', error);
    throw error;
  }
};

export const updateUserCBTData = async (userId, newData) => {
  try {
    const userDocRef = doc(db, 'userCBT', userId);
    await updateDoc(userDocRef, newData);
  } catch (error) {
    console.error('Error updating user CBT data:', error);
    throw error;
  }
};