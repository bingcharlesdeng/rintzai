import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import Navbar from '../Navbar';
import WelcomeMessage from '../WelcomeMessage';
import FeatureSection from './FeatureSection';
import QuoteSection from '../QuoteSection';
import AnimatedArt from '../AnimatedArt';
import './home.css';

const Home = () => {
  const { user, isLoggedIn } = useUserContext();

  console.log('Home component rendered');
  console.log('User:', user);
  console.log('Is logged in:', isLoggedIn);

  return (
    <div className="home-container">
      <Navbar />
      <main className="content">
        <WelcomeMessage user={user} />
        <FeatureSection />
        <QuoteSection />
      </main>
    </div>
  );
};

export default Home;