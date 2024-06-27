import React from 'react';
import './AffirmationCategories.css';

const AffirmationCategories = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="affirmation-categories">
      <h3>Categories</h3>
      <div className="category-buttons">
        {categories.map(category => (
          <button
            key={category}
            className={category === activeCategory ? 'active' : ''}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AffirmationCategories;