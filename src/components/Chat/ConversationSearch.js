import React, { useState } from 'react';
import { db, collection, getDocs, query, where, orderBy } from '../../firebase/firebase';
import './conversationSearch.css';

const ConversationSearch = ({ conversations, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === '') {
      onSearchResults([]);
      return;
    }

    try {
      const messagesRef = collection(db, 'messages');
      const q = query(
        messagesRef,
        where('content', '>=', term),
        where('content', '<=', term + '\uf8ff'),
        orderBy('content'),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const matchingMessages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        highlighted: doc.data().content.toLowerCase().indexOf(term)
      }));

      console.log('Matching messages:', matchingMessages);

      const groupedResults = groupMessagesByConversation(matchingMessages, conversations);
      onSearchResults(groupedResults);
    } catch (error) {
      console.error('Error searching messages:', error);
    }
  };

  const groupMessagesByConversation = (messages, allConversations) => {
    const groupedMessages = {};
    messages.forEach(message => {
      if (!groupedMessages[message.conversationId]) {
        groupedMessages[message.conversationId] = [];
      }
      groupedMessages[message.conversationId].push(message);
    });

    return Object.keys(groupedMessages).map(conversationId => {
      const conversation = allConversations.find(c => c.id === conversationId);
      return {
        ...conversation,
        matchingMessages: groupedMessages[conversationId]
      };
    });
  };

  return (
    <div className="conversation-search">
      <input
        type="text"
        placeholder="Search conversations..."
        value={searchTerm}
        onChange={handleSearch}
        className="conversation-search-input"
      />
    </div>
  );
};

export default ConversationSearch;