// QuickAccessGrid.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaClipboard, FaChartBar, FaBook, FaComments, FaQuoteLeft, FaHeart, FaImages } from 'react-icons/fa';
import './quickAccessGrid.css';

const features = [
  { name: 'Profile', icon: FaUser, path: '/profile', color: '#4CAF50' },
  { name: 'Board', icon: FaClipboard, path: '/board', color: '#2196F3' },
  { name: 'Mood Tracker', icon: FaChartBar, path: '/mood-tracker', color: '#FF9800' },
  { name: 'Journal', icon: FaBook, path: '/journal', color: '#9C27B0' },
  { name: 'Chat', icon: FaComments, path: '/chat', color: '#00BCD4' },
  { name: 'Quotes', icon: FaQuoteLeft, path: '/quotes', color: '#F44336' },
  { name: 'Gratitude', icon: FaHeart, path: '/gratitude', color: '#E91E63' },
  { name: 'Display', icon: FaImages, path: '/display', color: '#795548' },
];

const QuickAccessGrid = () => {
  return (
    <div className="quick-access-grid">
      <h2>Quick Access</h2>
      <div className="grid-container">
        {features.map((feature, index) => (
          <Link to={feature.path} className="grid-item" style={{ backgroundColor: feature.color }} key={index}>
            <feature.icon className="grid-icon" />
            <span>{feature.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessGrid;