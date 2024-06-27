import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { db, collection, addDoc, query, where, getDocs, orderBy } from '../../firebase/firebase';
import './SleepTracker.css';

const SleepTracker = ({ userId }) => {
  const [sleepData, setSleepData] = useState([]);
  const [newEntry, setNewEntry] = useState({ date: '', hoursSlept: '', quality: 5 });
  const [showTips, setShowTips] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchSleepData();
    }
  }, [userId]);

  const fetchSleepData = async () => {
    if (!userId) {
      setError("User ID is undefined. Please ensure you're logged in.");
      return;
    }

    try {
      const sleepRef = collection(db, 'sleepData');
      const q = query(sleepRef, where('userId', '==', userId), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSleepData(fetchedData);
    } catch (error) {
      console.error("Error fetching sleep data:", error);
      setError("Failed to fetch sleep data. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError("User ID is undefined. Please ensure you're logged in.");
      return;
    }

    try {
      const entryData = {
        ...newEntry,
        userId,
        date: new Date(newEntry.date).toISOString(),
        hoursSlept: parseFloat(newEntry.hoursSlept),
        quality: parseInt(newEntry.quality)
      };
      await addDoc(collection(db, 'sleepData'), entryData);
      setNewEntry({ date: '', hoursSlept: '', quality: 5 });
      fetchSleepData();
    } catch (error) {
      console.error("Error adding sleep entry:", error);
      setError("Failed to add sleep entry. Please try again.");
    }
  };

  const renderSleepChart = () => {
    const data = {
      labels: sleepData.map(entry => new Date(entry.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Hours Slept',
          data: sleepData.map(entry => entry.hoursSlept),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Sleep Quality',
          data: sleepData.map(entry => entry.quality),
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }
      ]
    };

    return <Line data={data} />;
  };

  const sleepTips = [
    "Stick to a consistent sleep schedule, even on weekends.",
    "Create a relaxing bedtime routine.",
    "Ensure your bedroom is dark, quiet, and cool.",
    "Avoid caffeine, alcohol, and large meals before bedtime.",
    "Exercise regularly, but not too close to bedtime.",
    "Limit exposure to blue light from screens before sleep.",
    "Consider using a white noise machine or app.",
    "Practice relaxation techniques like deep breathing or meditation.",
    "Invest in a comfortable mattress and pillows.",
    "If you can't sleep, don't force it. Get up and do a calming activity."
  ];

  return (
    <div className="sleep-tracker">
      <h2>Sleep Tracker</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="sleep-form">
        <input
          type="date"
          name="date"
          value={newEntry.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="hoursSlept"
          value={newEntry.hoursSlept}
          onChange={handleInputChange}
          placeholder="Hours slept"
          step="0.1"
          min="0"
          max="24"
          required
        />
        <label>
          Sleep Quality:
          <input
            type="range"
            name="quality"
            value={newEntry.quality}
            onChange={handleInputChange}
            min="1"
            max="10"
          />
          {newEntry.quality}
        </label>
        <button type="submit">Add Entry</button>
      </form>

      <div className="sleep-chart">
        <h3>Sleep Pattern</h3>
        {renderSleepChart()}
      </div>

      <div className="sleep-stats">
        <h3>Sleep Statistics</h3>
        <p>Average Sleep Duration: {(sleepData.reduce((sum, entry) => sum + entry.hoursSlept, 0) / sleepData.length || 0).toFixed(2)} hours</p>
        <p>Average Sleep Quality: {(sleepData.reduce((sum, entry) => sum + entry.quality, 0) / sleepData.length || 0).toFixed(2)} / 10</p>
      </div>

      <div className="sleep-tips">
        <h3>Sleep Hygiene Tips</h3>
        <button onClick={() => setShowTips(!showTips)}>
          {showTips ? 'Hide Tips' : 'Show Tips'}
        </button>
        {showTips && (
          <ul>
            {sleepTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SleepTracker;