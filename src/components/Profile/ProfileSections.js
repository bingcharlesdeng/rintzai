import React from 'react';
import './profileSection.css';

const ProfileSections = ({ profile, editMode, onFieldChange }) => {
  return (
    <div className="profile-sections">
      <div className="profile-section">
        <h3 className="section-title">About</h3>
        {editMode ? (
          <textarea
            value={profile.about}
            onChange={(e) => onFieldChange('about', e.target.value)}
            className="section-content-input"
            placeholder="Tell us about yourself"
          />
        ) : (
          <p className="section-content">{profile.about || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h3 className="section-title">Mental Health Journey</h3>
        {editMode ? (
          <textarea
            value={profile.mentalHealthJourney}
            onChange={(e) => onFieldChange('mentalHealthJourney', e.target.value)}
            className="section-content-input"
            placeholder="Share your mental health journey"
          />
        ) : (
          <p className="section-content">{profile.mentalHealthJourney || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h3 className="section-title">Favorite Quotes</h3>
        {editMode ? (
          <textarea
            value={profile.favoriteQuotes.join('\n')}
            onChange={(e) => onFieldChange('favoriteQuotes', e.target.value.split('\n'))}
            className="section-content-input"
            placeholder="Enter your favorite quotes, one per line"
          />
        ) : (
          <ul className="quotes-list">
            {profile.favoriteQuotes.map((quote, index) => (
              <li key={index} className="quote-item">
                {quote}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="profile-section">
        <h3 className="section-title">Hobbies</h3>
        {editMode ? (
          <input
            type="text"
            value={profile.hobbies.join(', ')}
            onChange={(e) => onFieldChange('hobbies', e.target.value.split(',').map((hobby) => hobby.trim()))}
            className="section-content-input"
            placeholder="Enter your hobbies, separated by commas"
          />
        ) : (
          <p className="section-content">{profile.hobbies.join(', ') || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h3 className="section-title">Occupation</h3>
        {editMode ? (
          <input
            type="text"
            value={profile.occupation}
            onChange={(e) => onFieldChange('occupation', e.target.value)}
            className="section-content-input"
            placeholder="Enter your occupation"
          />
        ) : (
          <p className="section-content">{profile.occupation || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h3 className="section-title">Education</h3>
        {editMode ? (
          <input
            type="text"
            value={profile.education}
            onChange={(e) => onFieldChange('education', e.target.value)}
            className="section-content-input"
            placeholder="Enter your education"
          />
        ) : (
          <p className="section-content">{profile.education || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h3 className="section-title">Age</h3>
        {editMode ? (
          <input
            type="number"
            value={profile.age}
            onChange={(e) => onFieldChange('age', parseInt(e.target.value))}
            className="section-content-input"
            placeholder="Enter your age"
          />
        ) : (
          <p className="section-content">{profile.age || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h3 className="section-title">Gender</h3>
        {editMode ? (
          <select
            value={profile.gender}
            onChange={(e) => onFieldChange('gender', e.target.value)}
            className="section-content-input"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <p className="section-content">{profile.gender || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h3 className="section-title">Diagnoses</h3>
        {editMode ? (
          <input
            type="text"
            value={profile.diagnoses.join(', ')}
            onChange={(e) => onFieldChange('diagnoses', e.target.value.split(',').map((diagnosis) => diagnosis.trim()))}
            className="section-content-input"
            placeholder="Enter your diagnoses, separated by commas"
          />
        ) : (
          <p className="section-content">{profile.diagnoses.join(', ') || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h3 className="section-title">Treatments</h3>
        {editMode ? (
          <input
            type="text"
            value={profile.treatments.join(', ')}
            onChange={(e) => onFieldChange('treatments', e.target.value.split(',').map((treatment) => treatment.trim()))}
            className="section-content-input"
            placeholder="Enter your treatments, separated by commas"
          />
        ) : (
          <p className="section-content">{profile.treatments.join(', ') || 'N/A'}</p>
        )}
      </div>
      <div className="profile-section">
        <h3 className="section-title">Medications</h3>
        {editMode ? (
          <input
            type="text"
            value={profile.medications.join(', ')}
            onChange={(e) => onFieldChange('medications', e.target.value.split(',').map((medication) => medication.trim()))}
            className="section-content-input"
            placeholder="Enter your medications, separated by commas"
          />
        ) : (
          <p className="section-content">{profile.medications.join(', ') || 'N/A'}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileSections;