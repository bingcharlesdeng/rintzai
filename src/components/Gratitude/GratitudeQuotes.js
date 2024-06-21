import React from 'react';
import './gratitudeQuotes.css';

const GratitudeQuotes = () => {
  const quotes = [
    {
      text: 'Gratitude turns what we have into enough.',
      author: 'Aesop',
    },
    {
      text: 'Gratitude is the healthiest of all human emotions.',
      author: 'Zig Ziglar',
    },
    {
      text: 'Gratitude is the memory of the heart.',
      author: 'Jean Baptiste Massieu',
    },
    {
      text: 'Gratitude unlocks the fullness of life.',
      author: 'Melody Beattie',
    },
    {
      text: 'Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow.',
      author: 'Melody Beattie',
    },
  ];

  return (
    <div className="gratitude-quotes-container">
      <h2 className="gratitude-quotes-title">Gratitude Quotes</h2>
      <ul className="gratitude-quotes-list">
        {quotes.map((quote, index) => (
          <li key={index} className="gratitude-quote">
            <p className="gratitude-quote-text">{quote.text}</p>
            <p className="gratitude-quote-author">- {quote.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GratitudeQuotes;