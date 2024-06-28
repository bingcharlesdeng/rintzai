import { db, storage, collection, addDoc, getDocs, query, orderBy, limit, ref, uploadBytesResumable, getDownloadURL } from '../../firebase/firebase';

export const analyzeVoice = async (userId, audioBlob) => {
  try {
    // Upload audio file to Firebase Storage
    const audioRef = ref(storage, `voice_samples/${userId}_${Date.now()}.webm`);
    await uploadBytesResumable(audioRef, audioBlob);
    const audioUrl = await getDownloadURL(audioRef);

    // Here, you would typically send the audioUrl to your backend API for analysis
    // For this example, we'll simulate the analysis with random values
    const analysis = simulateEmotionAnalysis();

    // Save the analysis result to Firestore
    const analysisRef = collection(db, 'voiceAnalysis');
    await addDoc(analysisRef, {
      userId,
      timestamp: new Date().toISOString(),
      audioUrl,
      ...analysis,
    });

    return analysis;
  } catch (error) {
    console.error('Error analyzing voice:', error);
    throw error;
  }
};

export const fetchMoodHistory = async (userId) => {
  try {
    const analysisRef = collection(db, 'voiceAnalysis');
    const q = query(
      analysisRef,
      orderBy('timestamp', 'desc'),
      limit(10) // Limit to the last 10 entries
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data()).reverse();
  } catch (error) {
    console.error('Error fetching mood history:', error);
    throw error;
  }
};

// Simulated emotion analysis (replace with actual API call in production)
const simulateEmotionAnalysis = () => {
  return {
    happiness: Math.random(),
    sadness: Math.random(),
    anger: Math.random(),
    fear: Math.random(),
    disgust: Math.random(),
    surprise: Math.random(),
  };
};

export default {
  analyzeVoice,
  fetchMoodHistory,
};