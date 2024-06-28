import React, { useState, useEffect, useRef } from 'react';
import { useUserContext } from '../User/UserContext';
import VoiceRecorder from './VoiceRecorder';
import EmotionAnalysis from './EmotionAnalysis';
import MoodHistory from './MoodHistory';
import { analyzeVoice, fetchMoodHistory } from './voiceService';
import './Voice.css';
import Navbar from '../Routes/Navbar';

const Voice = () => {
  const { user } = useUserContext();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [emotionAnalysis, setEmotionAnalysis] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMoodHistory();
  }, [user]);

  const loadMoodHistory = async () => {
    try {
      const history = await fetchMoodHistory(user.uid);
      setMoodHistory(history);
    } catch (error) {
      console.error('Error fetching mood history:', error);
      setError('Failed to load mood history. Please try again later.');
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setAudioBlob(null);
    setEmotionAnalysis(null);
    setError(null);
  };

  const handleStopRecording = (blob) => {
    setIsRecording(false);
    setAudioBlob(blob);
  };

  const handleAnalyzeVoice = async () => {
    if (!audioBlob) {
      setError('Please record your voice first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const analysis = await analyzeVoice(user.uid, audioBlob);
      setEmotionAnalysis(analysis);
      await loadMoodHistory();
    } catch (error) {
      console.error('Error analyzing voice:', error);
      setError('Failed to analyze voice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
      
      <div className="voice-container">
        <h1>Voice Mood Tracker</h1>
        <div className="voice-content">
          <VoiceRecorder
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
          {audioBlob && (
            <button onClick={handleAnalyzeVoice} disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Analyze Voice'}
            </button>
          )}
          {error && <p className="error-message">{error}</p>}
          {emotionAnalysis && <EmotionAnalysis analysis={emotionAnalysis} />}
          <MoodHistory history={moodHistory} />
        </div>
      </div>
    
  );
};

export default Voice;