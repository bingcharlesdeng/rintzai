import React, { useState, useEffect } from 'react';
import { formatRelativeTime } from './utils';
import './conversationItem.css';
import { db, doc, getDoc } from '../../firebase/firebase';

const ConversationItem = ({ conversation, onSelectConversation, isSelected, loggedInUser, isSearchResult }) => {
  const [participantName, setParticipantName] = useState('');

  useEffect(() => {
    const fetchParticipantName = async () => {
      const otherParticipant = conversation.participants.find((participantId) => participantId !== loggedInUser.uid);

      if (otherParticipant) {
        const userDoc = await getDoc(doc(db, 'users', otherParticipant));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setParticipantName(userData.name);
        }
      } else {
        setParticipantName(loggedInUser.displayName);
      }
    };

    fetchParticipantName();
  }, [conversation.participants, loggedInUser.uid]);

  const handleClick = () => onSelectConversation(conversation, isSearchResult ? conversation.matchingMessages[0] : null);

  const { avatarUrl, lastMessage, unreadCount, lastMessageTimestamp } = conversation;

  return (
    <li className={`conversation-item ${isSelected ? 'active' : ''}`} onClick={handleClick}>
      <div className="conversation-avatar">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Participant Avatar" />
        ) : (
          <div className="default-avatar">{participantName?.charAt(0).toUpperCase()}</div>
        )}
      </div>
      <div className="conversation-details">
        <div className="conversation-name">{participantName}</div>
        <div className="conversation-last-message">
          {isSearchResult ? (
            <span className="search-preview">{conversation.matchingMessages[0].content}</span>
          ) : (
            <span className="last-message-text">{lastMessage}</span>
          )}
          <span className="last-message-timestamp">{formatRelativeTime(lastMessageTimestamp)}</span>
        </div>
      </div>
      {unreadCount > 0 && <div className="unread-count">{unreadCount}</div>}
    </li>
  );
};

export default ConversationItem;