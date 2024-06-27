import React, { useState } from 'react';
import './DBTDiaryCard.css';

const DBTDiaryCard = ({ dbtData, onDataUpdate }) => {
  const [entry, setEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    emotions: '',
    urges: '',
    skillsUsed: '',
    selfHarmUrges: 0,
    suicidalIdeation: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEntries = [...dbtData.diaryEntries, entry];
    onDataUpdate({ diaryEntries: updatedEntries });
    setEntry({
      date: new Date().toISOString().split('T')[0],
      emotions: '',
      urges: '',
      skillsUsed: '',
      selfHarmUrges: 0,
      suicidalIdeation: 0,
    });
  };

  return (
    <div className="dbt-diary-card">
      <h2>DBT Diary Card</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={entry.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="emotions">Emotions:</label>
          <textarea
            id="emotions"
            name="emotions"
            value={entry.emotions}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="urges">Urges:</label>
          <textarea
            id="urges"
            name="urges"
            value={entry.urges}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="skillsUsed">Skills Used:</label>
          <textarea
            id="skillsUsed"
            name="skillsUsed"
            value={entry.skillsUsed}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="selfHarmUrges">Self-Harm Urges (0-5):</label>
          <input
            type="number"
            id="selfHarmUrges"
            name="selfHarmUrges"
            min="0"
            max="5"
            value={entry.selfHarmUrges}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="suicidalIdeation">Suicidal Ideation (0-5):</label>
          <input
            type="number"
            id="suicidalIdeation"
            name="suicidalIdeation"
            min="0"
            max="5"
            value={entry.suicidalIdeation}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit Entry</button>
      </form>
    </div>
  );
};

export default DBTDiaryCard;