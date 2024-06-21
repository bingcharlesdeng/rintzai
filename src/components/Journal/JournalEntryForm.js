import React, { useState } from 'react';
import './journalEntryForm.css';

const JournalEntryForm = ({ onAddEntry }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('neutral');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting new entry');
    onAddEntry({
      title,
      content,
      mood,
      tags: tags.split(',').map(tag => tag.trim())
    });
    setTitle('');
    setContent('');
    setMood('neutral');
    setTags('');
  };

  return (
    <form className="journal-entry-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entry Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts..."
        required
      />
      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="angry">Angry</option>
        <option value="neutral">Neutral</option>
      </select>
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
      />
      <button type="submit">Save Entry</button>
    </form>
  );
};

export default JournalEntryForm;