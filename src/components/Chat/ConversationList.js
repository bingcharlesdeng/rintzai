import React, { useState, useEffect } from 'react';
import './conversationList.css';
import { db, collection, getDocs, query, where } from '../../firebase/firebase';
import ConversationItem from './ConversationItem';
import SearchResultItem from './SearchResultItem';

const ConversationList = ({ conversations, searchResults, onSelectConversation, selectedConversation, loggedInUser }) => {
  const [participantNames, setParticipantNames] = useState({});

  useEffect(() => {
    const fetchParticipantNames = async () => {
      if (conversations.length === 0) return;

      const participantIds = conversations.reduce((ids, conversation) => [...ids, ...conversation.participants], []);
      const uniqueParticipantIds = [...new Set(participantIds)];

      const usersRef = collection(db, 'users');
      const userDocs = await Promise.all(
        uniqueParticipantIds.map((userId) => getDocs(query(usersRef, where('userId', '==', userId))))
      );

      const names = {};
      userDocs.forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          names[doc.data().userId] = doc.data().name;
        });
      });

      setParticipantNames(names);
      console.log('Fetched participant names:', names);
    };

    fetchParticipantNames();
  }, [conversations]);

  const getParticipantNames = (conversation) => {
    const names = conversation.participants
      .map((participantId) => participantNames[participantId])
      .filter((name) => name !== loggedInUser.name);
    return names.join(', ');
  };

  return (
    <div className="conversation-list-container">
      <div className="conversation-list-wrapper">
        <ul className="conversation-list">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <SearchResultItem
                key={result.id}
                result={result}
                onSelectConversation={onSelectConversation}
                loggedInUser={loggedInUser}
              />
            ))
          ) : (
            conversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                onSelectConversation={() => onSelectConversation(conversation)}
                isSelected={selectedConversation?.id === conversation.id}
                getParticipantNames={getParticipantNames}
                loggedInUser={loggedInUser}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ConversationList;