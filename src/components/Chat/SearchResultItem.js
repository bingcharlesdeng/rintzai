import React from 'react';
import { formatRelativeTime } from './utils';
import './searchResultItem.css';

const SearchResultItem = ({ result, onSelectConversation }) => {
  const handleClick = () => {
    onSelectConversation(result, result.matchingMessages[0]);
  };

  return (
    <li className="search-result-item" onClick={handleClick}>
      <div className="search-result-header">
        <span className="other-user-name">{result.otherUserName}</span>
        <span className="match-count">{result.matchingMessages.length} match(es)</span>
      </div>
      {result.matchingMessages.slice(0, 2).map((message, index) => (
        <div key={index} className="result-preview">
          <p>
            <span className="message-content">
              {message.content.substring(0, message.highlighted)}
              <span className="highlight">
                {message.content.substring(message.highlighted, message.highlighted + result.searchTerm.length)}
              </span>
              {message.content.substring(message.highlighted + result.searchTerm.length)}
            </span>
          </p>
          <span className="result-timestamp">
            {formatRelativeTime(message.timestamp)}
          </span>
        </div>
      ))}
    </li>
  );
};

export default SearchResultItem;