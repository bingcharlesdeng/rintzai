import React, { useState, useEffect } from 'react';
import './searchBar.css';

const SearchBar = ({ entries, onSearch, onEntrySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const results = entries.filter(entry =>
          (entry.title && entry.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (entry.content && entry.content.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setSearchResults(results);
        onSearch(searchTerm);
      } else {
        setSearchResults([]);
        onSearch('');
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, entries, onSearch]);

  const highlightText = (text, highlight) => {
    if (!text) return '';
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <mark key={index}>{part}</mark> 
        : part
    );
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search entries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map(entry => (
            <li key={entry.id} onClick={() => onEntrySelect(entry)}>
              <h4>{highlightText(entry.title, searchTerm)}</h4>
              <p>{highlightText(entry.content.substring(0, 100), searchTerm)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;