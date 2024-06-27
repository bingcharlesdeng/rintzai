import React from 'react';
import './DBTResources.css';

const resources = [
  {
    title: 'DBT Skills Training Manual',
    author: 'Marsha M. Linehan',
    description: 'Comprehensive guide to DBT skills training.',
    link: 'https://example.com/dbt-manual'
  },
  {
    title: 'The Dialectical Behavior Therapy Skills Workbook',
    author: 'Matthew McKay, Jeffrey C. Wood, and Jeffrey Brantley',
    description: 'Practical DBT workbook for self-help and therapy.',
    link: 'https://example.com/dbt-workbook'
  },
  {
    title: 'DBT® Skills Training Handouts and Worksheets',
    author: 'Marsha M. Linehan',
    description: 'Collection of handouts and worksheets for DBT skills practice.',
    link: 'https://example.com/dbt-handouts'
  },
  {
    title: 'DBT Made Simple',
    author: 'Sheri Van Dijk',
    description: 'A step-by-step guide to Dialectical Behavior Therapy.',
    link: 'https://example.com/dbt-made-simple'
  }
];

const DBTResources = () => {
  return (
    <div className="dbt-resources">
      <h2>DBT Resources</h2>
      <ul className="resource-list">
        {resources.map((resource, index) => (
          <li key={index} className="resource-item">
            <h3>{resource.title}</h3>
            <p className="author">by {resource.author}</p>
            <p className="description">{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">Learn More</a>
          </li>
        ))}
      </ul>
      <div className="additional-resources">
        <h3>Additional Resources</h3>
        <ul>
          <li><a href="https://behavioraltech.org" target="_blank" rel="noopener noreferrer">Behavioral Tech (Linehan Institute)</a></li>
          <li><a href="https://www.dbtselfhelp.com" target="_blank" rel="noopener noreferrer">DBT Self Help</a></li>
          <li><a href="https://www.nami.org/Learn-More/Treatment/Psychotherapy/Dialectical-Behavior-Therapy" target="_blank" rel="noopener noreferrer">NAMI: Dialectical Behavior Therapy</a></li>
        </ul>
      </div>
    </div>
  );
};

export default DBTResources;