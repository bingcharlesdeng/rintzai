// QuoteDisplay.js
import React from 'react';
import './quoteDisplay.css';

const QuoteDisplay = ({ quote, onCopy, onShare, onFavorite }) => {
  if (!quote) return <div>No quote selected</div>;

  return (
    <div className="quote-display">
      <blockquote>{quote.text}</blockquote>
      <cite>- {quote.author}</cite>
      <div className="quote-actions">
        <button onClick={() => onCopy(quote)} className="action-button">
          Copy
        </button>
        <button onClick={() => onShare(quote)} className="action-button">
          Share
        </button>
        <button onClick={() => onFavorite(quote)} className="action-button">
          Favorite
        </button>
      </div>
      {quote.context && (
        <div className="quote-context">
          <h4>Context:</h4>
          <p>{quote.context}</p>
        </div>
      )}
      {quote.reflectionPrompt && (
        <div className="reflection-prompt">
          <h4>Reflect:</h4>
          <p>{quote.reflectionPrompt}</p>
        </div>
      )}
    </div>
  );
};

export default QuoteDisplay;