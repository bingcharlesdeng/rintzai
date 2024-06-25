import React from 'react';
import './searchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <i className="fas fa-search search-icon"></i>
    </div>
  );
};

export default SearchBar;