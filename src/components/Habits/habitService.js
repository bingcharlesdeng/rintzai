import { db, doc, getDoc, setDoc, updateDoc } from '../../firebase/firebase';

export const fetchUserHabits = async (userId) => {
  try {
    const userDocRef = doc(db, 'userHabits', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data().habits;
    } else {
      // If the document doesn't exist, create it with an empty habits array
      await setDoc(userDocRef, { habits: [] });
      return [];
    }
  } catch (error) {
    console.error('Error fetching user habits:', error);
    throw error;
  }
};

export const updateUserHabits = async (userId, habits) => {
  try {
    const userDocRef = doc(db, 'userHabits', userId);
    await updateDoc(userDocRef, { habits });
  } catch (error) {
    console.error('Error updating user habits:', error);
    throw error;
  }
};