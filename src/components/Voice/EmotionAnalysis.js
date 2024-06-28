import React from 'react';
import './EmotionAnalysis.css';

const EmotionAnalysis = ({ analysis }) => {
  const emotions = [
    { name: 'Happiness', value: analysis.happiness },
    { name: 'Sadness', value: analysis.sadness },
    { name: 'Anger', value: analysis.anger },
    { name: 'Fear', value: analysis.fear },
    { name: 'Disgust', value: analysis.disgust },
    { name: 'Surprise', value: analysis.surprise }
  ];

  const dominantEmotion = emotions.reduce((prev, current) => 
    (current.value > prev.value) ? current : prev
  );

  return (
    <div className="emotion-analysis">
      <h2>Emotion Analysis Results</h2>
      <p>Dominant Emotion: <strong>{dominantEmotion.name}</strong></p>
      <div className="emotion-bars">
        {emotions.map(emotion => (
          <div key={emotion.name} className="emotion-bar">
            <div className="emotion-label">{emotion.name}</div>
            <div className="emotion-value-bar" style={{ width: `${emotion.value * 100}%` }}></div>
            <div className="emotion-value">{(emotion.value * 100).toFixed(2)}%</div>
          </div>
        ))}
      </div>
      <p className="analysis-note">
        Note: This analysis is based on voice characteristics and may not always accurately reflect your true emotional state.
      </p>
    </div>
  );
};

export default EmotionAnalysis;