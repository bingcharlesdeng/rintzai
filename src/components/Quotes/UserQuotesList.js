import React from 'react';
import './userQuotesList.css';

const UserQuotesList = ({ quotes, onQuoteSelect }) => {
  return (
    <div className="user-quotes-list">
      <h3>Community Quotes</h3>
      {quotes.length > 0 ? (
        <ul>
          {quotes.map((quote, index) => (
            <li key={index} onClick={() => onQuoteSelect(quote)}>
              <blockquote>{quote.text}</blockquote>
              <cite>- {quote.author}</cite>
            </li>
          ))}
        </ul>
      ) : (
        <p>No user-submitted quotes yet. Be the first to contribute!</p>
      )}
    </div>
  );
};

export default UserQuotesList;
