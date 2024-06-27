import React from 'react';
import './ResourceCategories.css';

const ResourceCategories = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="resource-categories">
      <h3>Categories</h3>
      <ul>
        {categories.map(category => (
          <li 
            key={category}
            className={category === selectedCategory ? 'active' : ''}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceCategories;