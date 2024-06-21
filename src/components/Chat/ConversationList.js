import React, { useState, useEffect } from 'react';
import './conversationList.css';
import { formatRelativeTime } from './utils';
import { db, collection, getDocs, query, where } from '../../firebase/firebase';
import ConversationItem from './ConversationItem';

const ConversationList = ({ conversations, searchResults, onSelectConversation, selectedConversation, loggedInUser }) => {
  const [participantNames, setParticipantNames] = useState({});

  useEffect(() => {
    const fetchParticipantNames = async () => {
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
    };

    fetchParticipantNames();
  }, [conversations]);

  const getParticipantNames = (conversation) => {
    const names = conversation.participants
      .map((participantId) => participantNames[participantId])
      .filter((name) => name !== loggedInUser.name);
    console.log(names, "names");
    console.log(participantNames, "participant object");
    return names.join(', ');
  };

  const conversationsToRender = searchResults.length > 0 ? searchResults : conversations;

  return (
    <div className="conversation-list-container">
      <div className="conversation-list-wrapper">
        <ul className="conversation-list">
          {conversationsToRender.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              onSelectConversation={() => onSelectConversation(conversation)}
              isSelected={selectedConversation?.id === conversation.id}
              getParticipantNames={getParticipantNames}
              loggedInUser={loggedInUser}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConversationList;