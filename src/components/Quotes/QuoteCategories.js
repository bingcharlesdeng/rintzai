// QuoteCategories.js
import React from 'react';
import './quoteCategories.css';

const categories = ['Inspirational', 'Motivational', 'Love', 'Life', 'Success'];

const QuoteCategories = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="quote-categories">
      <h3>Categories</h3>
      <div className="category-buttons">
        {categories.map(category => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuoteCategories;