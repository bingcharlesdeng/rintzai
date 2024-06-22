import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaClipboard, FaChartBar, FaBook, FaComments, FaQuoteLeft, FaHeart, FaImages } from 'react-icons/fa';
import './featureSection.css';


const features = [
  { name: 'Profile', icon: FaUser, path: '/profile' },
  { name: 'Board', icon: FaClipboard, path: '/board' },
  { name: 'Mood Tracker', icon: FaChartBar, path: '/mood-tracker' },
  { name: 'Journal', icon: FaBook, path: '/journal' },
  { name: 'Chat', icon: FaComments, path: '/chat' },
  { name: 'Quotes', icon: FaQuoteLeft, path: '/quotes' },
  { name: 'Gratitude', icon: FaHeart, path: '/gratitude' },
  { name: 'Display', icon: FaImages, path: '/display' }, // Added Display feature
];

const FeatureButton = ({ name, icon: Icon, path }) => (
  <Link to={path} className="feature-button">
    <Icon className="feature-icon" />
    <span>{name}</span>
  </Link>
);

const FeatureSection = () => {
  return (
    <div className="feature-section">
      {features.map((feature, index) => (
        <FeatureButton key={index} {...feature} />
      ))}
    </div>
  );
};

export default FeatureSection;