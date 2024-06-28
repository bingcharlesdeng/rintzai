import React, { useRef, useEffect } from 'react';
import './VoiceRecorder.css';

const VoiceRecorder = ({ isRecording, onStartRecording, onStopRecording }) => {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onStopRecording(audioBlob);
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="voice-recorder">
      <button
        onClick={isRecording ? stopRecording : onStartRecording}
        className={isRecording ? 'recording' : ''}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {isRecording && <div className="recording-indicator">Recording...</div>}
    </div>
  );
};

export default VoiceRecorder;