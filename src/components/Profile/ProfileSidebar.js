import React from 'react';
import './profileSidebar.css';

const ProfileSidebar = ({ profile, editMode, onFieldChange }) => {
  console.log('Rendering ProfileSidebar with profile:', profile);

  if (!profile) {
    console.log('Profile is null, rendering loading state');
    return <aside className="profile-sidebar">Loading profile...</aside>;
  }

  return (
    <aside className="profile-sidebar">
      <section className="sidebar-section">
        <h3>About Me</h3>
        {editMode ? (
          <textarea
            value={profile.about || ''}
            onChange={(e) => onFieldChange('about', e.target.value)}
            className="about-input"
            placeholder="Tell us about yourself..."
          />
        ) : (
          <p>{profile.about || 'No information provided'}</p>
        )}
      </section>
      <section className="sidebar-section">
        <h3>Recovery Focus</h3>
        {editMode ? (
          <textarea
            value={profile.recoveryFocus ? profile.recoveryFocus.join('\n') : ''}
            onChange={(e) => onFieldChange('recoveryFocus', e.target.value.split('\n').filter(item => item.trim() !== ''))}
            className="recovery-focus-input"
            placeholder="Enter recovery focus areas..."
          />
        ) : (
          <ul>
            {(profile.recoveryFocus || []).map((focus, index) => (
              <li key={index}>{focus}</li>
            ))}
          </ul>
        )}
        {(!profile.recoveryFocus || profile.recoveryFocus.length === 0) && <p>No recovery focus set</p>}
      </section>
      <section className="sidebar-section">
        <h3>Coping Strategies</h3>
        {editMode ? (
          <textarea
            value={profile.copingStrategies ? profile.copingStrategies.join('\n') : ''}
            onChange={(e) => onFieldChange('copingStrategies', e.target.value.split('\n').filter(item => item.trim() !== ''))}
            className="coping-strategies-input"
            placeholder="Enter coping strategies..."
          />
        ) : (
          <ul>
            {(profile.copingStrategies || []).map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
        )}
        {(!profile.copingStrategies || profile.copingStrategies.length === 0) && <p>No coping strategies set</p>}
      </section>
      <section className="sidebar-section">
        <h3>Interests</h3>
        {editMode ? (
          <div className="interests-edit">
            <input
              type="text"
              value={profile.interests ? profile.interests.join(', ') : ''}
              onChange={(e) => onFieldChange('interests', e.target.value.split(',').map(item => item.trim()))}
              className="interests-input"
              placeholder="Enter interests, separated by commas"
            />
          </div>
        ) : (
          <div className="interests-tags">
            {(profile.interests || []).map((interest, index) => (
              <span key={index} className="interest-tag">
                {interest}
              </span>
            ))}
          </div>
        )}
        {(!profile.interests || profile.interests.length === 0) && <p>No interests set</p>}
      </section>
    </aside>
  );
};

export default ProfileSidebar;