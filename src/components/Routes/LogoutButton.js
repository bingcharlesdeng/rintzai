import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useUserContext } from '../User/UserContext';
import './logoutButton.css';

const LogoutButton = () => {
  const { logout } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoutClick = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      setIsLoading(true);
      try {
        await signOut(auth);
        logout();
        // Update UI or redirect user after successful logout
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Logout failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <button 
      className={`logout-button ${isLoading ? 'loading' : ''}`} 
      onClick={handleLogoutClick}
      disabled={isLoading}
      aria-label="Logout"
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
};

export default LogoutButton;