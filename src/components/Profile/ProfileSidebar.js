import React from 'react';
import './profileSidebar.css';

const ProfileSidebar = ({ profile }) => {
  console.log('Rendering ProfileSidebar with profile:', profile);

  if (!profile) {
    console.log('Profile is null, rendering loading state');
    return <aside className="profile-sidebar">Loading profile...</aside>;
  }

  return (
    <aside className="profile-sidebar">
      <section className="sidebar-section">
        <h3>About Me</h3>
        <p>{profile.about || 'No information provided'}</p>
      </section>
      <section className="sidebar-section">
        <h3>Recovery Focus</h3>
        <ul>
          {(profile.recoveryFocus || []).map((focus, index) => (
            <li key={index}>{focus}</li>
          ))}
        </ul>
        {(!profile.recoveryFocus || profile.recoveryFocus.length === 0) && <p>No recovery focus set</p>}
      </section>
      <section className="sidebar-section">
        <h3>Coping Strategies</h3>
        <ul>
          {(profile.copingStrategies || []).map((strategy, index) => (
            <li key={index}>{strategy}</li>
          ))}
        </ul>
        {(!profile.copingStrategies || profile.copingStrategies.length === 0) && <p>No coping strategies set</p>}
      </section>
      <section className="sidebar-section">
        <h3>Interests</h3>
        <div className="interests-tags">
          {(profile.interests || []).map((interest, index) => (
            <span key={index} className="interest-tag">
              {interest}
            </span>
          ))}
        </div>
        {(!profile.interests || profile.interests.length === 0) && <p>No interests set</p>}
      </section>
    </aside>
  );
};

export default ProfileSidebar;