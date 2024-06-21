import React, { useState } from 'react';
import { submitUserQuote } from './quoteService';
import './userQuoteSubmission.css';

const UserQuoteSubmission = ({ onQuoteSubmit }) => {
  const [quoteText, setQuoteText] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quoteText && author) {
      const newQuote = { text: quoteText, author, category };
      await submitUserQuote(newQuote);
      onQuoteSubmit(newQuote);
      setQuoteText('');
      setAuthor('');
      setCategory('');
    }
  };

  return (
    <div className="user-quote-submission">
      <h3>Submit Your Own Quote</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
          placeholder="Enter your quote"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
        />
        <button type="submit">Submit Quote</button>
      </form>
    </div>
  );
};

export default UserQuoteSubmission;