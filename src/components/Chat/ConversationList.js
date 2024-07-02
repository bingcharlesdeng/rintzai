import React from 'react';
import './conversationList.css';
import ConversationItem from './ConversationItem';
import SearchResultItem from './SearchResultItem';

const ConversationList = ({ conversations, onSelectConversation, selectedConversation, loggedInUser, isSearching }) => {
  return (
    <div className="conversation-list-container">
      <div className="conversation-list-wrapper">
        <ul className="conversation-list">
          {conversations.map((conversation) => (
            isSearching ? (
              <SearchResultItem
                key={conversation.id}
                result={conversation}
                onSelectConversation={onSelectConversation}
                loggedInUser={loggedInUser}
              />
            ) : (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                onSelectConversation={() => onSelectConversation(conversation)}
                isSelected={selectedConversation?.id === conversation.id}
                loggedInUser={loggedInUser}
              />
            )
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConversationList;