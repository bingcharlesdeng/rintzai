import React from 'react';
import { formatRelativeTime } from './utils';
import './searchResultItem.css';

const SearchResultItem = ({ result, onSelectConversation, loggedInUser }) => {
  const handleClick = () => {
    onSelectConversation(result);
  };

  const matchingMessage = result.matchingMessages[0];
  const previewText = matchingMessage.content;
  const highlightIndex = matchingMessage.highlighted;
  const searchTerm = previewText.substring(highlightIndex, highlightIndex + matchingMessage.content.length - highlightIndex);

  return (
    <li className="search-result-item" onClick={handleClick}>
      <div className="result-preview">
        <span className="other-user-name">{result.otherUserName}</span>
        {previewText.substring(0, highlightIndex)}
        <span className="highlight">
          {searchTerm}
        </span>
        {previewText.substring(highlightIndex + searchTerm.length)}
      </div>
      <div className="result-metadata">
        <span className="result-timestamp">
          {formatRelativeTime(matchingMessage.timestamp)}
        </span>
      </div>
    </li>
  );
};

export default SearchResultItem;