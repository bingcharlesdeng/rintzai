import React from 'react';
import './ResourceSuggestions.css';

const ResourceSuggestions = ({ resources, onResourceSelect }) => {
  // Get 5 random resources as suggestions
  const suggestedResources = resources
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  return (
    <div className="resource-suggestions">
      <h3>Suggested Resources</h3>
      <ul>
        {suggestedResources.map(resource => (
          <li key={resource.id} onClick={() => onResourceSelect(resource)}>
            {resource.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceSuggestions;