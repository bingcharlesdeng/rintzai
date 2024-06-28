import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../User/UserContext';
import LogoutButton from './LogoutButton';
import './navbar.css';

const Navbar = () => {
  const { user } = useUserContext();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { label: 'Home', to: '/home' },
    {
      label: 'Tools',
      children: [
        { to: '/mood-tracker', label: 'Mood Tracker' },
        { to: '/journal', label: 'Journal' },
        { to: '/goals', label: 'Goals' },
        { to: '/cbt', label: 'CBT' },
        { to: '/habits', label: 'Habit Tracker' },
        { to: '/dbt', label: 'DBT' },
        { to: '/sleep', label: 'Sleep Tracker' },
        { to: '/vision', label: 'Vision Board' },
        { to: '/music', label: 'Mood Music' },
        { to: '/voice', label: 'Voice Journal' },
        { to: '/progress', label: 'Progress Tracker' },
      ],
    },
    {
      label: 'Wellness',
      children: [
        { to: '/meditation', label: 'Meditation' },
        { to: '/gratitude', label: 'Gratitude' },
        { to: '/quotes', label: 'Quotes' },
        { to: '/affirmations', label: 'Affirmations' },
        { to: '/mental', label: 'Mental Health' },
      ],
    }, 
    { 
      label: 'Community',
      children: [
        { to: '/chat', label: 'Chat' },
        { to: '/resources', label: 'Resources' },
        { to: '/profile', label: 'Profile' },
        { to: '/social', label: 'Social' },
        { to: '/collaboration', label: 'Collaboration' },
        { to: '/community', label: 'Community' },
      ],
    },
    { to: '/recommendations', label: 'Recommendations' },
    { to: '/display', label: 'Display' },
  ];

  const handleDropdownToggle = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const renderNavLink = (link) => {
    if (link.children) {
      return (
        <div key={link.label} className="navbar-dropdown">
          <button 
            className="navbar-dropdown-toggle"
            onClick={() => handleDropdownToggle(link.label)}
            aria-expanded={activeDropdown === link.label}
          >
            {link.label}
          </button>
          <div className={`navbar-dropdown-content ${activeDropdown === link.label ? 'open' : ''}`}>
            {link.children.map(renderNavLink)}
          </div>
        </div>
      );
    }
    return (
      <Link
        key={link.to}
        to={link.to}
        className={`navbar-link ${location.pathname === link.to ? 'active' : ''}`}
        onClick={() => {
          setIsMenuOpen(false);
          setActiveDropdown(null);
        }}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Rintzai</Link>
        <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          {user && navLinks.map(renderNavLink)}
          {user && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;