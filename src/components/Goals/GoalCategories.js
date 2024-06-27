import React from 'react';
import './GoalCategories.css';

const categories = ['All', 'Personal', 'Professional', 'Health', 'Financial'];

const GoalCategories = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="goal-categories">
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
  );
};

export default GoalCategories;