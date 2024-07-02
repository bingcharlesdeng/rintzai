import { db, collection, addDoc, updateDoc, doc, serverTimestamp } from '../../firebase/firebase';

export const sendMessage = async (message, conversationId, senderId) => {
  try {
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const conversationRef = doc(db, 'conversations', conversationId);
    
    const newMessage = {
      content: message,
      senderId,
      timestamp: serverTimestamp(),
    };

    await addDoc(messagesRef, newMessage);
    await updateDoc(conversationRef, {
      lastMessage: message,
      lastMessageTimestamp: serverTimestamp(),
    });

    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const createNewConversation = async (userId1, userId2) => {
  try {
    const conversationsRef = collection(db, 'conversations');
    const newConversation = {
      participants: [userId1, userId2],
      lastMessage: '',
      lastMessageTimestamp: serverTimestamp(),
    };
    const docRef = await addDoc(conversationsRef, newConversation);
    return { id: docRef.id, ...newConversation };
  } catch (error) {
    console.error('Error creating new conversation:', error);
    throw error;
  }
};