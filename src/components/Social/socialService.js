import { db, doc, getDoc, setDoc, updateDoc, collection, addDoc, query, where, getDocs, orderBy, limit, arrayUnion } from '../../firebase/firebase';

export const fetchUserSocialData = async (userId) => {
  try {
    const userDocRef = doc(db, 'userSocial', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    } else {
      // If the document doesn't exist, create it with default values
      const defaultData = {
        id: userId,
        name: '',
        bio: '',
        interests: [],
        connections: [],
        sentRequests: [],
        receivedRequests: [],
        supportGroups: [],
        sharedExperiences: [],
      };
      await setDoc(userDocRef, defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error('Error fetching user social data:', error);
    throw error;
  }
};

export const updateUserSocialData = async (userId, newData) => {
  try {
    const userDocRef = doc(db, 'userSocial', userId);
    await updateDoc(userDocRef, newData);
  } catch (error) {
    console.error('Error updating user social data:', error);
    throw error;
  }
};

export const fetchSupportGroups = async () => {
    try {
      const groupsRef = collection(db, 'supportGroups');
      const querySnapshot = await getDocs(groupsRef);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching support groups:', error);
      throw error;
    }
  };
  
  export const joinSupportGroup = async (userId, groupId) => {
    try {
      const groupRef = doc(db, 'supportGroups', groupId);
      await updateDoc(groupRef, {
        members: arrayUnion(userId)
      });
      const userRef = doc(db, 'userSocial', userId);
      await updateDoc(userRef, {
        supportGroups: arrayUnion(groupId)
      });
    } catch (error) {
      console.error('Error joining support group:', error);
      throw error;
    }
  };
  
  export const fetchPeerSuggestions = async (userId) => {
    try {
      const usersRef = collection(db, 'userSocial');
      const q = query(usersRef, where('id', '!=', userId), limit(10));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching peer suggestions:', error);
      throw error;
    }
  };
  
  export const sendConnectionRequest = async (senderId, receiverId) => {
    try {
      const senderRef = doc(db, 'userSocial', senderId);
      const receiverRef = doc(db, 'userSocial', receiverId);
      await updateDoc(senderRef, {
        sentRequests: arrayUnion(receiverId)
      });
      await updateDoc(receiverRef, {
        receivedRequests: arrayUnion(senderId)
      });
    } catch (error) {
      console.error('Error sending connection request:', error);
      throw error;
    }
  };
  
  export const fetchSharedExperiences = async () => {
    try {
      const experiencesRef = collection(db, 'sharedExperiences');
      const q = query(experiencesRef, orderBy('date', 'desc'), limit(50));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching shared experiences:', error);
      throw error;
    }
  };
  
  export const shareExperience = async (userId, content) => {
    try {
      const userRef = doc(db, 'userSocial', userId);
      const userDoc = await getDoc(userRef);
      const userName = userDoc.data().name;
  
      const experienceData = {
        userId,
        userName,
        content,
        date: new Date().toISOString()
      };
  
      const docRef = await addDoc(collection(db, 'sharedExperiences'), experienceData);
      return { id: docRef.id, ...experienceData };
    } catch (error) {
      console.error('Error sharing experience:', error);
      throw error;
    }
  };
  
  export const fetchChatMessages = async () => {
    try {
      const messagesRef = collection(db, 'chatMessages');
      const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(50));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).reverse();
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      throw error;
    }
  };
  
  export const sendChatMessage = async (userId, content) => {
    try {
      const messageData = {
        userId,
        content,
        timestamp: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, 'chatMessages'), messageData);
      return { id: docRef.id, ...messageData };
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error;
    }
  };