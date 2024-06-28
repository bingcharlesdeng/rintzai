import React, { useState } from 'react';
import './ContributionForm.css';

const ContributionForm = ({ onAddContribution }) => {
  const [contributionType, setContributionType] = useState('copingStrategies');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const contributionContent = contributionType === 'copingStrategies' 
      ? { title, description: content }
      : { content };
    onAddContribution(contributionType, contributionContent);
    setTitle('');
    setContent('');
  };

  return (
    <div className="contribution-form">
      <h2>Contribute to the Community</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contributionType">Contribution Type:</label>
          <select 
            id="contributionType" 
            value={contributionType} 
            onChange={(e) => setContributionType(e.target.value)}
          >
            <option value="copingStrategies">Coping Strategy</option>
            <option value="journalPrompts">Journal Prompt</option>
            <option value="motivationalQuotes">Motivational Quote</option>
          </select>
        </div>
        {contributionType === 'copingStrategies' && (
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input 
              type="text" 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="content">
            {contributionType === 'copingStrategies' ? 'Description' : 'Content'}:
          </label>
          <textarea 
            id="content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Submit Contribution</button>
      </form>
    </div>
  );
};

export default ContributionForm;