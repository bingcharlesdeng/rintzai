// src/components/Music/MoodMusic.js

import React, { useState, useEffect } from 'react';
import { db, collection, query, where, getDocs, addDoc, updateDoc, doc } from '../../firebase/firebase';
import { Line } from 'react-chartjs-2';
import './MoodMusic.css';
import Navbar from '../Routes/Navbar';

const MoodMusic = ({ userId }) => {
  const [currentMood, setCurrentMood] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [calmingSounds, setCalmingSounds] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState(null);
  const [showJournalPrompt, setShowJournalPrompt] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathCount, setBreathCount] = useState(0);

  useEffect(() => {
    fetchPlaylists();
    fetchCalmingSounds();
    fetchMoodHistory();
  }, [userId]);

  useEffect(() => {
    if (currentMood) {
      updateUserMood();
    }
  }, [currentMood, userId]);

  const fetchPlaylists = async () => {
    try {
      const playlistsRef = collection(db, 'moodPlaylists');
      const querySnapshot = await getDocs(playlistsRef);
      const fetchedPlaylists = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlaylists(fetchedPlaylists);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const fetchCalmingSounds = async () => {
    try {
      const soundsRef = collection(db, 'calmingSounds');
      const querySnapshot = await getDocs(soundsRef);
      const fetchedSounds = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCalmingSounds(fetchedSounds);
    } catch (error) {
      console.error("Error fetching calming sounds:", error);
    }
  };

  const fetchMoodHistory = async () => {
    if (!userId) return;

    try {
      const userMoodRef = collection(db, 'userMoods');
      const q = query(userMoodRef, where('userId', '==', userId), where('timestamp', '>=', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)));
      const querySnapshot = await getDocs(q);
      const moodData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMoodHistory(moodData);
    } catch (error) {
      console.error("Error fetching mood history:", error);
    }
  };

  const updateUserMood = async () => {
    if (!userId) return;

    try {
      const userMoodRef = collection(db, 'userMoods');
      await addDoc(userMoodRef, { 
        userId, 
        mood: currentMood, 
        timestamp: new Date() 
      });
      fetchMoodHistory();
    } catch (error) {
      console.error("Error updating user mood:", error);
    }
  };

  const handleMoodChange = (mood) => {
    setCurrentMood(mood);
    setShowJournalPrompt(true);
  };

  const handleAudioSelect = (audio, type) => {
    setSelectedAudio({ ...audio, type });
    if (audioElement) {
      audioElement.pause();
    }
    const newAudio = new Audio(audio.url);
    setAudioElement(newAudio);
    newAudio.play();
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleJournalSubmit = async () => {
    if (!userId || !journalEntry) return;

    try {
      const journalRef = collection(db, 'userJournals');
      await addDoc(journalRef, {
        userId,
        entry: journalEntry,
        mood: currentMood,
        timestamp: new Date()
      });
      setJournalEntry('');
      setShowJournalPrompt(false);
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };

  const startBreathingExercise = () => {
    setIsBreathing(true);
    setBreathCount(0);
    const breathingInterval = setInterval(() => {
      setBreathCount(prevCount => {
        if (prevCount >= 10) {
          clearInterval(breathingInterval);
          setIsBreathing(false);
          return 0;
        }
        return prevCount + 1;
      });
    }, 5000); // 5 seconds per breath
  };

  const renderMoodChart = () => {
    const data = {
      labels: moodHistory.map(entry => new Date(entry.timestamp.toDate()).toLocaleDateString()),
      datasets: [{
        label: 'Mood',
        data: moodHistory.map(entry => {
          const moodValues = { 'Happy': 5, 'Energetic': 4, 'Calm': 3, 'Sad': 2, 'Anxious': 1 };
          return moodValues[entry.mood] || 0;
        }),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    return <Line data={data} options={{ scales: { y: { beginAtZero: true, max: 5 } } }} />;
  };

  return (
    <div className="mood-music">
      <h2>Mood-Based Wellness Center</h2>
      <div className="mood-selector">
        <h3>How are you feeling?</h3>
        <div className="mood-buttons">
          {['Happy', 'Sad', 'Energetic', 'Calm', 'Anxious'].map(mood => (
            <button
              key={mood}
              onClick={() => handleMoodChange(mood)}
              className={currentMood === mood ? 'active' : ''}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      {showJournalPrompt && (
        <div className="journal-prompt">
          <h3>Reflect on your mood</h3>
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write about how you're feeling..."
          />
          <button onClick={handleJournalSubmit}>Save Journal Entry</button>
        </div>
      )}

      <div className="mood-chart">
        <h3>Your Mood History</h3>
        {renderMoodChart()}
      </div>

      <div className="playlists">
        <h3>Suggested Playlists</h3>
        <ul>
          {playlists
            .filter(playlist => playlist.mood === currentMood)
            .map(playlist => (
              <li key={playlist.id} onClick={() => handleAudioSelect(playlist, 'playlist')}>
                {playlist.name}
              </li>
            ))}
        </ul>
      </div>

      <div className="calming-sounds">
        <h3>Calming Sounds</h3>
        <ul>
          {calmingSounds.map(sound => (
            <li key={sound.id} onClick={() => handleAudioSelect(sound, 'sound')}>
              {sound.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedAudio && (
        <div className="audio-player">
          <h4>Now Playing: {selectedAudio.name}</h4>
          <button onClick={togglePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      )}

      <div className="breathing-exercise">
        <h3>Guided Breathing Exercise</h3>
        {isBreathing ? (
          <div>
            <p>{breathCount % 2 === 0 ? 'Inhale...' : 'Exhale...'}</p>
            <p>Breath {Math.floor(breathCount / 2) + 1} of 5</p>
          </div>
        ) : (
          <button onClick={startBreathingExercise}>Start Breathing Exercise</button>
        )}
      </div>

      <div className="wellness-tips">
        <h3>Wellness Tips</h3>
        <ul>
          <li>Practice mindfulness for 5 minutes daily</li>
          <li>Stay hydrated throughout the day</li>
          <li>Take short breaks to stretch and move</li>
          <li>Connect with a friend or loved one</li>
          <li>Express gratitude for three things each day</li>
        </ul>
      </div>
    </div>
    
  );
};

export default MoodMusic;