// quoteService.js
import { db } from '../../firebase/firebase';
import { collection, addDoc, getDocs, query, where, limit, orderBy, serverTimestamp } from 'firebase/firestore';

export const fetchQuoteOfDay = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const quotesRef = collection(db, 'quotesOfDay');
  const q = query(quotesRef, where('date', '==', today), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    // If no quote for today, generate a new one
    const newQuote = await generateRandomQuote();
    await addDoc(quotesRef, { ...newQuote, date: today });
    return newQuote;
  } else {
    return querySnapshot.docs[0].data();
  }
};

export const fetchQuotes = async (category = 'all') => {
  const quotesRef = collection(db, 'quotes');
  let q = quotesRef;

  if (category !== 'all') {
    q = query(quotesRef, where('category', '==', category));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const submitUserQuote = async (quote) => {
  const userQuotesRef = collection(db, 'userQuotes');
  await addDoc(userQuotesRef, { ...quote, createdAt: serverTimestamp() });
};

export const fetchUserQuotes = async () => {
    const userQuotesRef = collection(db, 'userQuotes');
    const q = query(userQuotesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  
  export const generateRandomQuote = async () => {
    const quotesRef = collection(db, 'quotes');
    const q = query(quotesRef, orderBy('random'), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      // Fallback quote if no quotes are found
      return {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
      };
    }
  };
  
  export const favoriteQuote = async (userId, quoteId) => {
    const userFavoritesRef = collection(db, 'userFavorites');
    await addDoc(userFavoritesRef, { 
      userId, 
      quoteId, 
      createdAt: serverTimestamp() 
    });
  };
  
  export const fetchFavoriteQuotes = async (userId) => {
    const userFavoritesRef = collection(db, 'userFavorites');
    const q = query(userFavoritesRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const favoriteIds = querySnapshot.docs.map(doc => doc.data().quoteId);
    
    // Fetch the actual quotes
    const quotesRef = collection(db, 'quotes');
    const quotesSnapshot = await getDocs(query(quotesRef, where('id', 'in', favoriteIds)));
    
    return quotesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  
  export const searchQuotes = async (searchTerm) => {
    const quotesRef = collection(db, 'quotes');
    const q = query(
      quotesRef,
      where('text', '>=', searchTerm),
      where('text', '<=', searchTerm + '\uf8ff'),
      limit(20)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };