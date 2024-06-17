import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import LogoutButton from './LogoutButton';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUserContext();

  const handleGoBack = () => {
    navigate(-1);
    console.log('Navigating back');
  };

  const handleLogoClick = () => {
    navigate('/');
    console.log('Navigating to home');
  };

  console.log('Navbar rendered');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo" onClick={handleLogoClick}>
          Rintzai
        </h1>
        <div className="navbar-buttons">
          <button
            className="navbar-button"
            onClick={handleGoBack}
            disabled={window.location.pathname === '/'}
          >
            Go Back
          </button>
          {isLoggedIn && (
            <>
              <button className="navbar-button" onClick={() => navigate('/profile')}>
                Profile
              </button>
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;