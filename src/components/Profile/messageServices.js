import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const sendMessage = async (senderId, recipientId, content) => {
  await addDoc(collection(db, 'messages'), {
    senderId,
    recipientId,
    content,
    timestamp: serverTimestamp()
  });
};