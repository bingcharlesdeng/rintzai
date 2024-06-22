// Navbar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../User/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserContext();

  const handleGoBack = () => {
    navigate(-1);
    console.log('Navigating back');
  };

  const handleLogoClick = () => {
    navigate('/');
    console.log('Navigating to home');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      navigate('/login');
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderNavLinks = () => {
    if (user) {
      return (
        <>
          <NavLink to="/home" className="navbar-link" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/profile" className="navbar-link" activeClassName="active">
            Profile
          </NavLink>
          <NavLink to="/display" className="navbar-link" activeClassName="active">
            Display
          </NavLink>
          <NavLink to="/journal" className="navbar-link" activeClassName="active">
            Journal
          </NavLink>
          <NavLink to="/mood-tracker" className="navbar-link" activeClassName="active">
            Mood Tracker
          </NavLink>
          <NavLink to="/chat" className="navbar-link" activeClassName="active">
            Chat
          </NavLink>
          <NavLink to="/quotes" className="navbar-link" activeClassName="active">
            Quotes
          </NavLink>
          <NavLink to="/gratitude" className="navbar-link" activeClassName="active">
            Gratitude
          </NavLink>
          <button onClick={handleLogout} className="navbar-logout">
            Logout
          </button>
        </>
      );
    }
    return null;
  };

  const renderBackButton = () => {
    if (window.location.pathname !== '/') {
      return (
        <button className="navbar-back-button" onClick={handleGoBack}>
          &larr; Go Back
        </button>
      );
    }
    return null;
  };

  console.log('Navbar rendered');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={handleLogoClick}>
          Rintzai
        </NavLink>
        <div className="navbar-links">
          {renderBackButton()}
          {renderNavLinks()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;