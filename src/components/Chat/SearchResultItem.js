import React from 'react';
import { formatRelativeTime } from './utils';
import './searchResultItem.css';

const SearchResultItem = ({ result, onSelectConversation, loggedInUser }) => {
  const handleClick = () => {
    onSelectConversation(result, result.matchingMessages[0]);
  };

  const previewText = result.matchingMessages[0].content;
  const highlightIndex = result.matchingMessages[0].highlighted;
  const searchTerm = previewText.substring(highlightIndex, highlightIndex + result.matchingMessages[0].content.length - highlightIndex);

  return (
    <li className="search-result-item" onClick={handleClick}>
      <div className="result-preview">
        {previewText.substring(0, highlightIndex)}
        <span className="highlight">
          {searchTerm}
        </span>
        {previewText.substring(highlightIndex + searchTerm.length)}
      </div>
      <div className="result-metadata">
        <span className="result-timestamp">
          {formatRelativeTime(result.matchingMessages[0].timestamp)}
        </span>
      </div>
    </li>
  );
};

export default SearchResultItem;