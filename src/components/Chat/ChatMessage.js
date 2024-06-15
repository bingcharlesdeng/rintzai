import React from 'react';
import { formatRelativeTime } from './utils';

const ChatMessage = ({ message, loggedInUser, messageId }) => {
  const { content, senderId, timestamp } = message;
  const isSentByLoggedInUser = senderId === loggedInUser.uid;

  return (
    <div
      className={`message ${isSentByLoggedInUser ? 'sent' : 'received'}`}
      id={messageId} // Set the ID attribute for the message
    >
      <div className="message-content">{content}</div>
      <div className="message-timestamp">
        {timestamp ? formatRelativeTime(timestamp) : ''}
      </div>
    </div>
  );
};

export default ChatMessage;