const sendMessage = async (message, conversationId, senderId, timestamp) => {
  try {
    const newMessage = {
      conversationId,
      senderId,
      content: message,
      timestamp: timestamp,
    };
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const docRef = await addDoc(messagesRef, newMessage);

    const conversationRef = doc(db, 'conversations', conversationId);
    await updateDoc(conversationRef, {
      lastMessage: message,
      lastMessageTimestamp: timestamp,
    });

    console.log('Message sent!');
    return docRef.id;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

const fetchMessages = async (conversationId) => {
  const messagesRef = collection(db, 'conversations', conversationId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};