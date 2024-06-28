import React from 'react';
import './MotivationalQuotes.css';

const MotivationalQuotes = ({ quotes }) => {
  return (
    <div className="motivational-quotes">
      <h2>Community Motivational Quotes</h2>
      <div className="quotes-list">
        {quotes.map((quote, index) => (
          <div key={index} className="quote-item">
            <blockquote>{quote.content}</blockquote>
            <cite>- {quote.author}</cite>
            <div className="quote-meta">
              <span>Contributed by: {quote.authorName}</span>
              <span>Likes: {quote.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotivationalQuotes;