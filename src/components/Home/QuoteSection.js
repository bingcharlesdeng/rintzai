import React, { useState, useEffect } from 'react';
import './quoteSection.css';

const QuoteSection = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('The best way to predict the future is to create it.');
      setAuthor('Abraham Lincoln');
    }
  };

  return (
    <div className="quote-section">
      <h3>Inspirational Quote</h3>
      <blockquote>
        <p>{quote}</p>
        <footer>- {author}</footer>
      </blockquote>
      <button onClick={fetchQuote} className="new-quote-button">New Quote</button>
    </div>
  );
};

export default QuoteSection;