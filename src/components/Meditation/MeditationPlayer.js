import React, { useState, useRef, useEffect } from 'react';
import './MeditationPlayer.css';

const MeditationPlayer = ({ meditation, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onComplete(meditation.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="meditation-player">
      <h2>{meditation.title}</h2>
      <p>{meditation.description}</p>
      <audio 
        ref={audioRef}
        src={meditation.audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <div className="player-controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${(currentTime / meditation.duration) * 100}%` }}
          ></div>
        </div>
        <span>{formatTime(currentTime)} / {formatTime(meditation.duration)}</span>
      </div>
    </div>
  );
};

export default MeditationPlayer;