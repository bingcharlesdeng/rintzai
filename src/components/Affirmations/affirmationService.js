import { db, doc, getDoc, setDoc, updateDoc } from '../../firebase/firebase';

export const fetchUserAffirmations = async (userId) => {
  try {
    const userDocRef = doc(db, 'userAffirmations', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    } else {
      // If the document doesn't exist, create it with default values
      const defaultData = {
        dailyAffirmation: { text: "I am capable of achieving great things." },
        customAffirmations: [],
        reminders: [],
      };
      await setDoc(userDocRef, defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error('Error fetching user affirmations:', error);
    throw error;
  }
};

export const updateUserAffirmations = async (userId, newData) => {
  try {
    const userDocRef = doc(db, 'userAffirmations', userId);
    await updateDoc(userDocRef, newData);
  } catch (error) {
    console.error('Error updating user affirmations:', error);
    throw error;
  }
};

export const fetchDailyAffirmation = async () => {
  // This function would fetch a new daily affirmation from your backend
  // For now, we'll return a static affirmation
  return { text: "You are strong, capable, and worthy of love and respect." };
};