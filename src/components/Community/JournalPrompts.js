import React from 'react';
import './JournalPrompts.css';

const JournalPrompts = ({ prompts }) => {
  return (
    <div className="journal-prompts">
      <h2>Community Journal Prompts</h2>
      <div className="prompts-list">
        {prompts.map((prompt, index) => (
          <div key={index} className="prompt-item">
            <p>{prompt.content}</p>
            <div className="prompt-meta">
              <span>Contributed by: {prompt.authorName}</span>
              <span>Likes: {prompt.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalPrompts;