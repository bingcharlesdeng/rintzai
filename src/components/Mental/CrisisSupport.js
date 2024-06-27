import React from 'react';
import './CrisisSupport.css';

const CrisisSupport = () => {
  const emergencyResources = [
    { name: 'National Suicide Prevention Lifeline', phone: '1-800-273-8255', website: 'https://suicidepreventionlifeline.org/' },
    { name: 'Crisis Text Line', phone: 'Text HOME to 741741', website: 'https://www.crisistextline.org/' },
    { name: 'National Domestic Violence Hotline', phone: '1-800-799-7233', website: 'https://www.thehotline.org/' },
    { name: 'National Sexual Assault Hotline', phone: '1-800-656-4673', website: 'https://www.rainn.org/' },
    { name: 'SAMHSA National Helpline', phone: '1-800-662-4357', website: 'https://www.samhsa.gov/find-help/national-helpline' },
  ];

  return (
    <div className="crisis-support">
      <h2>Crisis Support Resources</h2>
      <div className="emergency-message">
        <h3>If you're in immediate danger, please call your local emergency services (911 in the US).</h3>
      </div>
      <div className="resource-list">
        {emergencyResources.map((resource, index) => (
          <div key={index} className="resource-item">
            <h3>{resource.name}</h3>
            <p>Phone: <a href={`tel:${resource.phone}`}>{resource.phone}</a></p>
            <p>Website: <a href={resource.website} target="_blank" rel="noopener noreferrer">{resource.website}</a></p>
          </div>
        ))}
      </div>
      <div className="crisis-plan">
        <h3>Create a Crisis Plan</h3>
        <p>Having a crisis plan can help you navigate difficult moments. Consider including:</p>
        <ul>
          <li>Warning signs that you may be entering a crisis</li>
          <li>Coping strategies that have worked for you in the past</li>
          <li>Names and contact information for your support network</li>
          <li>Professional help contacts (therapist, psychiatrist, etc.)</li>
          <li>A list of reasons to live or things that bring you joy</li>
        </ul>
        <button>Create My Crisis Plan</button>
      </div>
    </div>
  );
};

export default CrisisSupport;