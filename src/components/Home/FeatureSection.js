import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaClipboard, FaChartBar, FaBook, FaComments, FaQuoteLeft, FaHeart, FaImages, FaBullseye, FaTasks } from 'react-icons/fa';
import './FeatureSection.css';

const features = [
  { name: 'Profile', icon: FaUser, path: '/profile', color: '#4CAF50' },
  { name: 'Board', icon: FaClipboard, path: '/board', color: '#2196F3' },
  { name: 'Mood Tracker', icon: FaChartBar, path: '/mood-tracker', color: '#FF9800' },
  { name: 'Journal', icon: FaBook, path: '/journal', color: '#9C27B0' },
  { name: 'Chat', icon: FaComments, path: '/chat', color: '#00BCD4' },
  { name: 'Quotes', icon: FaQuoteLeft, path: '/quotes', color: '#F44336' },
  { name: 'Gratitude', icon: FaHeart, path: '/gratitude', color: '#E91E63' },
  { name: 'Display', icon: FaImages, path: '/display', color: '#795548' },
  { name: 'Vision', icon: FaBullseye, path: '/vision', color: '#607D8B' },
  { name: 'Goals', icon: FaTasks, path: '/goals', color: '#009688' },
];

const FeatureButton = ({ name, icon: Icon, path, color }) => (
  <Link to={path} className="feature-button" style={{ backgroundColor: color }}>
    <Icon className="feature-icon" />
    <span>{name}</span>
  </Link>
);

const FeatureSection = () => {
  return (
    <div className="feature-section">
      <h2>Quick Access</h2>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <FeatureButton key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;