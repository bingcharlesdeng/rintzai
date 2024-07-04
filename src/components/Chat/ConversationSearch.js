import React, { useState } from 'react';
import { db, collection, query, getDocs, doc, getDoc, orderBy } from '../../firebase/firebase';
import './conversationSearch.css';
import LoadingSpinner from './LoadingSpinner';

const ConversationSearch = ({ conversations, onSearchResults, loggedInUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === '') {
      onSearchResults([]);
      return;
    }

    setIsLoading(true);

    try {
      const results = await searchConversations(term, conversations, loggedInUser);
      onSearchResults(results);
    } catch (error) {
      console.error('Error searching conversations:', error);
      onSearchResults([]);
    } finally {
      setIsLoading(false);
    }
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
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

async function searchConversations(searchTerm, conversations, loggedInUser) {
  const results = [];

  for (const conversation of conversations) {
    try {
      const messagesRef = collection(db, 'conversations', conversation.id, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'desc'));
      
      const querySnapshot = await getDocs(q);
      
      const matchingMessages = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          highlighted: doc.data().content.toLowerCase().indexOf(searchTerm.toLowerCase())
        }))
        .filter(message => message.highlighted !== -1);

      if (matchingMessages.length > 0) {
        const otherUser = conversation.participants.find(userId => userId !== loggedInUser.uid);
        const otherUserName = await getUserName(otherUser);

        results.push({
          ...conversation,
          matchingMessages,
          otherUserName,
          searchTerm
        });
      }
    } catch (error) {
      console.error('Error searching conversation:', conversation.id, error);
    }
  }

  return results;
}

async function getUserName(userId) {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().name;
    }
    return 'Unknown User';
  } catch (error) {
    console.error('Error fetching user name:', error);
    return 'Unknown User';
  }
}

export default ConversationSearch;