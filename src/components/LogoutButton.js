import React from 'react';
import { useUserContext } from './UserContext';
import { getAuth, signOut } from 'firebase/auth';
import './LogoutButton.css';

const LogoutButton = () => {
  const { logout } = useUserContext();
  const auth = getAuth();

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      logout();
      console.log('Logged out successfully!');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogoutClick}>
      Logout
    </button>
  );
};

export default LogoutButton;