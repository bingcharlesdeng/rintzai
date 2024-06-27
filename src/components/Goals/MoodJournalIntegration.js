import React from 'react';
import './MoodJournalIntegration.css';

const MoodJournalIntegration = ({ goals, moodData, journalEntries, onUpdateGoal }) => {
  const getRelevantMoodData = (goal) => {
    return moodData.filter(mood => {
      const moodDate = new Date(mood.date);
      const goalStartDate = new Date(goal.createdAt);
      const goalEndDate = new Date(goal.deadline);
      return moodDate >= goalStartDate && moodDate <= goalEndDate;
    });
  };

  const getRelevantJournalEntries = (goal) => {
    return journalEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      const goalStartDate = new Date(goal.createdAt);
      const goalEndDate = new Date(goal.deadline);
      return entryDate >= goalStartDate && entryDate <= goalEndDate;
    });
  };

  const calculateAverageMood = (moodData) => {
    if (moodData.length === 0) return 'N/A';
    const sum = moodData.reduce((acc, mood) => acc + mood.score, 0);
    return (sum / moodData.length).toFixed(2);
  };

  const handleInsightSubmit = (goalId, insight) => {
    onUpdateGoal(goalId, { insight });
  };

  return (
    <div className="mood-journal-integration">
      <h2>Mood and Journal Insights</h2>
      {goals.map(goal => {
        const relevantMoodData = getRelevantMoodData(goal);
        const relevantJournalEntries = getRelevantJournalEntries(goal);
        const averageMood = calculateAverageMood(relevantMoodData);

        return (
          <div key={goal.id} className="goal-insight">
            <h3>{goal.title}</h3>
            <p>Average Mood: {averageMood}</p>
            <p>Journal Entries: {relevantJournalEntries.length}</p>
            <div className="journal-snippets">
              {relevantJournalEntries.slice(0, 3).map(entry => (
                <p key={entry.id}>{entry.content.substring(0, 100)}...</p>
              ))}
            </div>
            <textarea
              placeholder="Record your insights based on mood and journal data..."
              value={goal.insight || ''}
              onChange={(e) => handleInsightSubmit(goal.id, e.target.value)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MoodJournalIntegration;