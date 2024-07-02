import { collection, getDocs, doc, writeBatch, getDoc } from "firebase/firestore";

export async function migrateMessagesToSubcollection(db) {
  const conversationsRef = collection(db, "conversations");
  const conversationSnapshot = await getDocs(conversationsRef);

  for (const conversationDoc of conversationSnapshot.docs) {
    const conversationId = conversationDoc.id;
    console.log(`Processing conversation: ${conversationId}`);

    const messageIds = conversationDoc.data().messageIds || [];
    const messagesRef = collection(db, 'messages');
    const batch = writeBatch(db);

    for (const messageId of messageIds) {
      const messageDoc = await getDoc(doc(messagesRef, messageId));
      if (messageDoc.exists()) {
        const messageData = messageDoc.data();
        const newMessageRef = doc(collection(db, 'conversations', conversationId, 'messages'), messageId);
        batch.set(newMessageRef, messageData);
        batch.delete(doc(messagesRef, messageId));
      } else {
        console.log(`Message ${messageId} not found, skipping...`);
      }
    }

    batch.update(doc(db, 'conversations', conversationId), { messageIds: [] });

    try {
      await batch.commit();
      console.log(`Migrated messages for conversation ${conversationId}`);
    } catch (error) {
      console.error(`Error migrating messages for conversation ${conversationId}:`, error);
    }
  }
}