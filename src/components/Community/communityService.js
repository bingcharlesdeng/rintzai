import { db, collection, addDoc, getDocs, query, orderBy, limit } from '../../firebase/firebase';

export const fetchCommunityContent = async () => {
  try {
    const copingStrategies = await fetchCollectionData('copingStrategies');
    const journalPrompts = await fetchCollectionData('journalPrompts');
    const motivationalQuotes = await fetchCollectionData('motivationalQuotes');

    return {
      copingStrategies,
      journalPrompts,
      motivationalQuotes
    };
  } catch (error) {
    console.error('Error fetching community content:', error);
    throw error;
  }
};

const fetchCollectionData = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(20));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addContribution = async (userId, contributionType, content) => {
  try {
    const collectionRef = collection(db, contributionType);
    const contributionData = {
      ...content,
      authorId: userId,
      authorName: 'Anonymous', // You might want to fetch the user's name here
      likes: 0,
      createdAt: new Date().toISOString()
    };
    const docRef = await addDoc(collectionRef, contributionData);
    return { id: docRef.id, ...contributionData };
  } catch (error) {
    console.error('Error adding contribution:', error);
    throw error;
  }
};

export default {
  fetchCommunityContent,
  addContribution
};