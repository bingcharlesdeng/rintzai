// ProfileFriends.js
import React, { useState, useEffect } from 'react';
import './profileFriends.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUserContext } from '../UserContext';

const ProfileFriends = ({ profile }) => {
  const { user } = useUserContext();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchUserFriends = async () => {
      if (user) {
        const friendsRef = collection(db, 'friends');
        const q = query(friendsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedFriends = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFriends(fetchedFriends);
      }
    };

    fetchUserFriends();
  }, [user]);

  return (
    <div className="profile-friends">
      <h3 className="section-title">Friends</h3>
      {friends.length > 0 ? (
        <ul className="friend-list">
          {friends.map((friend) => (
            <li key={friend.id} className="friend-item">
              <img
                src={friend.avatarUrl || '/default-avatar.png'}
                alt={`${friend.name}'s avatar`}
                className="friend-avatar"
              />
              <div className="friend-details">
                <p className="friend-name">{friend.name}</p>
                <button className="remove-friend-button">Remove Friend</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-friends">You haven't added any friends yet.</p>
      )}
    </div>
  );
};

export default ProfileFriends;