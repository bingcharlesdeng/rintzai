import React from 'react';
import './CBTResources.css';

const resources = [
  {
    title: 'Cognitive Behavioral Therapy Basics',
    url: 'https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral',
    description: 'An overview of CBT from the American Psychological Association.',
  },
  {
    title: 'CBT Worksheets',
    url: 'https://www.therapistaid.com/therapy-worksheets/cbt/none',
    description: 'Free CBT worksheets and exercises from Therapist Aid.',
  },
  {
    title: 'CBT for Depression',
    url: 'https://www.nimh.nih.gov/health/publications/depression',
    description: 'Information about using CBT for depression from the National Institute of Mental Health.',
  },
  {
    title: 'CBT for Anxiety',
    url: 'https://www.anxietycanada.com/articles/cbt-for-anxiety/',
    description: 'Resources for using CBT to manage anxiety from Anxiety Canada.',
  },
];

const CBTResources = () => {
  return (
    <div className="cbt-resources">
      <h2>CBT Resources</h2>
      <ul className="resource-list">
        {resources.map((resource, index) => (
          <li key={index} className="resource-item">
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">Learn More</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CBTResources;