import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const sendMessage = async (senderId, recipientId, content) => {
  try {
    const messagesRef = collection(db, 'messages');
    const newMessage = {
      senderId,
      recipientId,
      content,
      timestamp: serverTimestamp(),
    };
    const docRef = await addDoc(messagesRef, newMessage);
    console.log('Message sent successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// You can add more message-related functions here as needed