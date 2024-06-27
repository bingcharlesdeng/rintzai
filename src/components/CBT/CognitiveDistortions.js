import React, { useState } from 'react';
import './CognitiveDistortions.css';

const cognitiveDistortions = [
  { name: 'All-or-Nothing Thinking', description: 'Seeing things in black-and-white categories.' },
  { name: 'Overgeneralization', description: 'Viewing a negative event as a never-ending pattern of defeat.' },
  { name: 'Mental Filter', description: 'Dwelling on the negatives and ignoring the positives.' },
  { name: 'Discounting the Positive', description: 'Insisting that accomplishments or positive qualities do not count.' },
  { name: 'Jumping to Conclusions', description: 'Making negative interpretations without actual evidence.' },
  { name: 'Magnification or Minimization', description: 'Exaggerating the importance of problems and shortcomings, or minimizing the importance of desirable qualities.' },
  { name: 'Emotional Reasoning', description: 'Assuming that negative emotions necessarily reflect the way things really are.' },
  { name: 'Should Statements', description: 'Telling yourself that things should be the way you hoped or expected them to be.' },
  { name: 'Labeling', description: 'Identifying with your shortcomings. Instead of saying "I made a mistake," you tell yourself "I am a loser," or "a fool," or "a failure."' },
  { name: 'Personalization and Blame', description: 'Holding yourself personally responsible for events that are not entirely under your control.' },
];

const CognitiveDistortions = ({ userData, onDataUpdate }) => {
  const [selectedDistortion, setSelectedDistortion] = useState('');
  const [example, setExample] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDistortionExample = {
      distortion: selectedDistortion,
      example,
      date: new Date().toISOString(),
    };
    onDataUpdate({ distortionExamples: [...(userData.distortionExamples || []), newDistortionExample] });
    setSelectedDistortion('');
    setExample('');
  };

  return (
    <div className="cognitive-distortions">
      <h2>Cognitive Distortions</h2>
      <div className="distortions-list">
        {cognitiveDistortions.map((distortion, index) => (
          <div key={index} className="distortion-item">
            <h3>{distortion.name}</h3>
            <p>{distortion.description}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="distortion-form">
        <h3>Record a Cognitive Distortion</h3>
        <div className="form-group">
          <label htmlFor="distortion">Select a Distortion:</label>
          <select
            id="distortion"
            value={selectedDistortion}
            onChange={(e) => setSelectedDistortion(e.target.value)}
            required
          >
            <option value="">Select a distortion</option>
            {cognitiveDistortions.map((distortion, index) => (
              <option key={index} value={distortion.name}>{distortion.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="example">Example:</label>
          <textarea
            id="example"
            value={example}
            onChange={(e) => setExample(e.target.value)}
            required
            placeholder="Describe an example of this cognitive distortion"
          />
        </div>
        <button type="submit">Save Example</button>
      </form>
      <div className="distortion-examples">
        <h3>Your Cognitive Distortion Examples</h3>
        {userData.distortionExamples && userData.distortionExamples.length > 0 ? (
          userData.distortionExamples.map((item, index) => (
            <div key={index} className="distortion-example-item">
              <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
              <p><strong>Distortion:</strong> {item.distortion}</p>
              <p><strong>Example:</strong> {item.example}</p>
            </div>
          ))
        ) : (
          <p>No examples recorded yet. Start by adding an example above!</p>
        )}
      </div>
    </div>
  );
};

export default CognitiveDistortions;