// src/components/Music/MoodMusic.js

import React, { useState, useEffect } from 'react';
import { db, collection, query, where, getDocs, addDoc, updateDoc, doc } from '../../firebase/firebase';
import './MoodMusic.css';

const MoodMusic = ({ userId }) => {
  const [currentMood, setCurrentMood] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [calmingSounds, setCalmingSounds] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState(null);

  useEffect(() => {
    fetchPlaylists();
    fetchCalmingSounds();
  }, []);

  useEffect(() => {
    if (currentMood) {
      fetchUserMood();
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

  const fetchUserMood = async () => {
    if (!userId) return;

    try {
      const userMoodRef = collection(db, 'userMoods');
      const q = query(userMoodRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userMoodDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'userMoods', userMoodDoc.id), { mood: currentMood });
      } else {
        await addDoc(userMoodRef, { userId, mood: currentMood });
      }
    } catch (error) {
      console.error("Error updating user mood:", error);
    }
  };

  const handleMoodChange = (mood) => {
    setCurrentMood(mood);
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

  return (
    <div className="mood-music">
      <h2>Mood-Based Music</h2>
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
    </div>
  );
};

export default MoodMusic;