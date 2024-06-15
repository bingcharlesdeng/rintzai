import React from 'react';
import { useUserContext } from './UserContext';
import { handleLogout } from './Logout';
import { getAuth } from 'firebase/auth';
import './LogoutButton.css';

const LogoutButton = () => {
  const { logout } = useUserContext();
  const auth = getAuth();

  const handleLogoutClick = async () => {
    try {
      await handleLogout(auth);
      logout();
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