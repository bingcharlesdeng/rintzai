import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import './moodTracker.css';
import MoodInsights from './MoodInsights';
import MoodChart from './MoodChart';
import FeelingWheel from './FeelingWheel';
import ThoughtTypeSelector from './ThoughtTypeSelector';
import PhysicalSensations from './PhysicalSensations';
import SignificantChanges from './SignificantChanges';
import MoodCalendar from './MoodCalender';
import ProgressReport from './ProgressReport';
import { db } from '../../firebase/firebase';



const MoodTracker = () => {
  const { user } = useUserContext();
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [selectedFeelings, setSelectedFeelings] = useState([]);
  const [thoughtType, setThoughtType] = useState(null);
  const [physicalSensations, setPhysicalSensations] = useState([]);
  const [significantChanges, setSignificantChanges] = useState([]);
  const [moodNotes, setMoodNotes] = useState('');
  const [moodEntries, setMoodEntries] = useState([]);

  useEffect(() => {
    const fetchMoodEntries = async () => {
      if (user) {
        const moodRef = collection(db, 'moodEntries');
        const q = query(moodRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const entries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMoodEntries(entries);
        console.log('Fetched mood entries:', entries);
      }
    };

    fetchMoodEntries();
  }, [user]);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    console.log('Selected mood:', mood);
  };

  const handleIntensityChange = (e) => {
    setMoodIntensity(parseInt(e.target.value));
    console.log('Mood intensity:', e.target.value);
  };

  const handleFeelingsSelect = (feelings) => {
    setSelectedFeelings(feelings);
    console.log('Selected feelings:', feelings);
  };

  const handleThoughtTypeSelect = (type) => {
    setThoughtType(type);
    console.log('Selected thought type:', type);
  };

  const handlePhysicalSensationsSelect = (sensations) => {
    setPhysicalSensations(sensations);
    console.log('Selected physical sensations:', sensations);
  };

  const handleSignificantChangesSelect = (changes) => {
    setSignificantChanges(changes);
    console.log('Selected significant changes:', changes);
  };

  const handleNotesChange = (e) => {
    setMoodNotes(e.target.value);
  };

  const submitMood = async () => {
    if (!selectedMood) return;

    const moodData = {
      mood: selectedMood,
      intensity: moodIntensity,
      feelings: selectedFeelings,
      thoughtType: thoughtType,
      physicalSensations: physicalSensations,
      significantChanges: significantChanges,
      notes: moodNotes,
      date: new Date().toISOString(),
      userId: user.uid,
    };

    const moodRef = collection(db, 'moodEntries');
    await addDoc(moodRef, moodData);

    console.log('Mood submitted:', moodData);
    setMoodEntries([...moodEntries, moodData]);
    resetForm();
  };

  const resetForm = () => {
    setSelectedMood(null);
    setMoodIntensity(5);
    setSelectedFeelings([]);
    setThoughtType(null);
    setPhysicalSensations([]);
    setSignificantChanges([]);
    setMoodNotes('');
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const moodOptions = ['Happy', 'Excited', 'Calm', 'Neutral', 'Sad', 'Angry', 'Anxious'];

  return (
    <Layout>
      <div className="mood-tracker-container">
        <h2 className="mood-tracker-title">Track Your Mood</h2>
        <div className="mood-tracker-form">
          <div className="mood-selection">
            <h3>How are you feeling?</h3>
            <div className="mood-buttons">
              {moodOptions.map((mood) => (
                <button
                  key={mood}
                  className={`mood-button ${selectedMood === mood.toLowerCase() ? 'selected' : ''}`}
                  onClick={() => handleMoodSelect(mood.toLowerCase())}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div className="mood-intensity">
            <h3>Intensity</h3>
            <input
              type="range"
              min="1"
              max="10"
              value={moodIntensity}
              onChange={handleIntensityChange}
            />
            <span>{moodIntensity}</span>
          </div>

          <FeelingWheel onFeelingsSelect={handleFeelingsSelect} />
          <ThoughtTypeSelector onThoughtTypeSelect={handleThoughtTypeSelect} />
          <PhysicalSensations onSensationsSelect={handlePhysicalSensationsSelect} />
          <SignificantChanges onChangesSelect={handleSignificantChangesSelect} />

          <div className="mood-notes">
            <h3>Additional Notes</h3>
            <textarea
              value={moodNotes}
              onChange={handleNotesChange}
              placeholder="Add any additional thoughts or context..."
            />
          </div>

          <button onClick={submitMood} disabled={!selectedMood} className="submit-mood-button">
            Submit Mood Entry
          </button>
        </div>

        <div className="mood-tracker-insights">
          <MoodInsights moodEntries={moodEntries} />
          <MoodChart moodEntries={moodEntries} />
          <MoodCalendar moodEntries={moodEntries} />
          <ProgressReport moodEntries={moodEntries} />
        </div>
      </div>
    </Layout>
  );
};

export default MoodTracker;