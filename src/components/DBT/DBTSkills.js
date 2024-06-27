import React, { useState } from 'react';
import './DBTSkills.css';

const dbtSkillModules = {
  'Mindfulness': [
    'Observe',
    'Describe',
    'Participate',
    'Non-judgmental stance',
    'One-mindfully',
    'Effectiveness'
  ],
  'Distress Tolerance': [
    'STOP skill',
    'Pros and cons',
    'TIPP skills',
    'Distract with ACCEPTS',
    'Self-soothe',
    'Improve the moment'
  ],
  'Emotion Regulation': [
    'Identifying emotions',
    'Check the facts',
    'Opposite action',
    'Problem solving',
    'ABC PLEASE',
    'Cope ahead'
  ],
  'Interpersonal Effectiveness': [
    'DEAR MAN',
    'GIVE',
    'FAST',
    'Validating others',
    'Building relationships',
    'Ending relationships'
  ]
};

const DBTSkills = ({ dbtData, onDataUpdate }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSkillComplete = (module, skill) => {
    const updatedSkills = { ...dbtData.completedSkills };
    if (!updatedSkills[module]) {
      updatedSkills[module] = [];
    }
    if (updatedSkills[module].includes(skill)) {
      updatedSkills[module] = updatedSkills[module].filter(s => s !== skill);
    } else {
      updatedSkills[module].push(skill);
    }
    onDataUpdate({ completedSkills: updatedSkills });
  };

  return (
    <div className="dbt-skills">
      <h2>DBT Skills</h2>
      <div className="skill-modules">
        {Object.keys(dbtSkillModules).map(module => (
          <button 
            key={module}
            onClick={() => setSelectedModule(module)}
            className={selectedModule === module ? 'active' : ''}
          >
            {module}
          </button>
        ))}
      </div>
      {selectedModule && (
        <div className="skill-list">
          <h3>{selectedModule}</h3>
          <ul>
            {dbtSkillModules[selectedModule].map(skill => (
              <li key={skill}>
                <label>
                  <input 
                    type="checkbox"
                    checked={dbtData.completedSkills[selectedModule]?.includes(skill) || false}
                    onChange={() => handleSkillComplete(selectedModule, skill)}
                  />
                  {skill}
                </label>
                <button onClick={() => setSelectedSkill(skill)}>Learn More</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedSkill && (
        <div className="skill-details">
          <h4>{selectedSkill}</h4>
          <p>Detailed information about {selectedSkill} would go here...</p>
        </div>
      )}
    </div>
  );
};

export default DBTSkills;