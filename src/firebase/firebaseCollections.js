import { db, collection, addDoc } from './firebase';

const createCollections = async () => {
  const collections = [
    'mentalHealthContent',
    'personalStories',
    'copingStrategies',
    'users',
  ];

  for (const collectionName of collections) {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, { created: new Date() });
  }
};

export default createCollections;