import React, { useState } from 'react';
import './journalPrompts.css';

const prompts = [
  "What made you smile today?",
  "Describe a challenge you faced and how you overcame it.",
  "What are you looking forward to in the near future?",
  "Reflect on a recent accomplishment, big or small.",
  "Write about a person who has positively influenced your life.",
];

const JournalPrompts = ({ onJournalSubmit }) => {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [journalEntry, setJournalEntry] = useState('');

  const handlePromptChange = (e) => {
    setSelectedPrompt(e.target.value);
  };

  const handleJournalEntry = (e) => {
    setJournalEntry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!journalEntry) return;

    console.log('Submitting journal prompt entry:', selectedPrompt, journalEntry);
    onJournalSubmit(journalEntry, selectedPrompt);
    setJournalEntry('');
    setSelectedPrompt('');
  };

  return (
    <div className="journal-prompts-container">
      <h3>Journal Prompts</h3>
      <select value={selectedPrompt} onChange={handlePromptChange}>
        <option value="">Select a prompt</option>
        {prompts.map((prompt, index) => (
          <option key={index} value={prompt}>
            {prompt}
          </option>
        ))}
      </select>
      {selectedPrompt && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={journalEntry}
            onChange={handleJournalEntry}
            placeholder="Write your journal entry here..."
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default JournalPrompts;