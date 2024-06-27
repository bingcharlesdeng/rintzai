import React, { useState } from 'react';
import './CreateAffirmation.css';

const CreateAffirmation = ({ onAddAffirmation }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && category.trim()) {
      onAddAffirmation({
        id: Date.now(),
        text: text.trim(),
        category: category.trim(),
      });
      setText('');
      setCategory('');
    }
  };

  return (
    <div className="create-affirmation">
      <h2>Create Your Own Affirmation</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your affirmation"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <button type="submit">Add Affirmation</button>
      </form>
    </div>
  );
};

export default CreateAffirmation;