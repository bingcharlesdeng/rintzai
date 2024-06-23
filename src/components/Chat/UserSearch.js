import React, { useState } from 'react';
import { searchUsers } from './userChatService';
import './userSearch.css';

const UserSearch = ({ onClose, onStartChat }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;

    try {
      const results = await searchUsers(searchTerm);
      setSearchResults(results);
      console.log('User search results:', results);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div className="user-search-overlay">
      <div className="user-search-modal">
        <h2>Find a user to chat with</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by name, email, or handle"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <ul className="user-search-results">
          {searchResults.map((user) => (
            <li key={user.id} onClick={() => onStartChat(user)}>
              <div className="user-avatar">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={`${user.name}'s avatar`} />
                ) : (
                  <div className="default-avatar">{user.name.charAt(0).toUpperCase()}</div>
                )}
              </div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
            </li>
          ))}
        </ul>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserSearch;