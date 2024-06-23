// Navbar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../User/UserContext';
import LogoutButton from './LogoutButton';
import './navbar.css';

const Navbar = () => {
  const { user } = useUserContext();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/profile', label: 'Profile' },
    { to: '/display', label: 'Display' },
    { to: '/journal', label: 'Journal' },
    { to: '/mood-tracker', label: 'Mood Tracker' },
    { to: '/chat', label: 'Chat' },
    { to: '/quotes', label: 'Quotes' },
    { to: '/gratitude', label: 'Gratitude' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Rintzai</Link>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          {user && navLinks.map(({ to, label }) => (
            <Link 
              key={to}
              to={to} 
              className={`navbar-link ${location.pathname === to ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          {user && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;