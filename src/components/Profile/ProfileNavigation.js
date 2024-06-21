import React from 'react';
import './profileNavigation.css';

const ProfileNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['Journey', 'Support Network', 'Milestones', 'Recovery Goals', 'Therapy Notes', 'Mood Overview'];

  return (
    <nav className="profile-navigation">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`nav-item ${activeTab === tab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default ProfileNavigation;