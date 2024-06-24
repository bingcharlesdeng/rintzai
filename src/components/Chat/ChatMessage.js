import React from 'react';
import { formatRelativeTime } from './utils';
import './chatMessage.css';
const ChatMessage = ({ message, loggedInUser, messageId, isHighlighted }) => {
  const { content, senderId, timestamp } = message;
  const isSentByLoggedInUser = senderId === loggedInUser.uid;

  return (
    <div
      className={`message ${isSentByLoggedInUser ? 'sent' : 'received'} ${isHighlighted ? 'highlighted' : ''}`}
      id={messageId}
    >
      <div className="message-content">{content}</div>
      <div className="message-timestamp">
        {timestamp ? formatRelativeTime(timestamp) : ''}
      </div>
    </div>
  );
};

export default ChatMessage;