import React, { useState, useEffect } from 'react';
import { fetchSupportGroups, joinSupportGroup } from './socialService';
import './SupportGroups.css';

const SupportGroups = ({ userData, onDataUpdate }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const loadGroups = async () => {
      const fetchedGroups = await fetchSupportGroups();
      setGroups(fetchedGroups);
    };
    loadGroups();
  }, []);

  const handleJoinGroup = async (groupId) => {
    try {
      await joinSupportGroup(userData.id, groupId);
      onDataUpdate({ supportGroups: [...userData.supportGroups, groupId] });
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  return (
    <div className="support-groups">
      <h2>Support Groups</h2>
      <div className="groups-list">
        {groups.map(group => (
          <div key={group.id} className="group-item">
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <p>Members: {group.memberCount}</p>
            {userData.supportGroups.includes(group.id) ? (
              <button disabled>Joined</button>
            ) : (
              <button onClick={() => handleJoinGroup(group.id)}>Join Group</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportGroups;