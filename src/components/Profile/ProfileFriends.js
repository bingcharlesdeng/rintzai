import React from 'react';
import './profileFriends.css';

const ProfileFriends = ({ friends }) => {
  console.log('ProfileFriends rendered');
  console.log('friends:', friends);

  return (
    <div className="profile-friends">
      <h2 className="section-title">Friends</h2>
      {friends && friends.length > 0 ? (
        <ul className="friend-list">
          {friends.map((friend) => (
            <li key={friend.id} className="friend-item">
              <img src={friend.avatarUrl} alt={`${friend.name}'s avatar`} className="friend-avatar" />
              <div className="friend-details">
                <p className="friend-name">{friend.name}</p>
                <button className="remove-friend-button">Remove Friend</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-friends">No friends added yet.</p>
      )}
    </div>
  );
};

export default ProfileFriends;