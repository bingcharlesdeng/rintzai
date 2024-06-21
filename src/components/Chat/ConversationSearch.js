import React, { useState } from 'react';
import { db, collection, getDocs, query, where, orderBy } from '../../firebase/firebase';


const ConversationSearch = ({ conversations, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      onSearchResults(conversations);
      return;
    }

    try {
      const messagesRef = collection(db, 'messages');
      const q = query(
        messagesRef,
        where('content', '>=', term),
        where('content', '<=', `${term}\uf8ff`),
        orderBy('timestamp', 'asc')
      );
      const querySnapshot = await getDocs(q);
      const matchingMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Matching messages:', matchingMessages);

      const conversationIds = matchingMessages.map((message) => message.conversationId);
      const uniqueConversationIds = [...new Set(conversationIds)];

      console.log('Conversation IDs:', uniqueConversationIds);

      const matchingConversations = conversations.filter((conversation) =>
        uniqueConversationIds.includes(conversation.id)
      );

      console.log('Matching conversations:', matchingConversations);

      onSearchResults(matchingConversations);
    } catch (error) {
      console.error('Error searching messages:', error);
    }
  };

  return (
    <div className="conversation-search">
      <input
        type="text"
        placeholder="Search conversations..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default ConversationSearch;