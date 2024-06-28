import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import CopingStrategies from './CopingStrategies';
import JournalPrompts from './JournalPrompts';
import MotivationalQuotes from './MotivationalQuotes';
import ContributionForm from './ContributionForm';
import { fetchCommunityContent, addContribution } from './communityService';
import './Community.css';
import Navbar from '../Routes/Navbar';

const Community = () => {
  const { user } = useUserContext();
  const [communityContent, setCommunityContent] = useState(null);
  const [activeComponent, setActiveComponent] = useState('CopingStrategies');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCommunityContent = async () => {
      setIsLoading(true);
      try {
        const content = await fetchCommunityContent();
        console.log('Fetched community content:', content);
        setCommunityContent(content);
      } catch (error) {
        console.error('Error loading community content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCommunityContent();
  }, []);

  const handleAddContribution = async (contributionType, content) => {
    try {
      const newContribution = await addContribution(user.uid, contributionType, content);
      console.log('New contribution added:', newContribution);
      setCommunityContent(prevContent => ({
        ...prevContent,
        [contributionType]: [...prevContent[contributionType], newContribution]
      }));
    } catch (error) {
      console.error('Error adding contribution:', error);
    }
  };

  const renderActiveComponent = () => {
    if (!communityContent) return null;

    switch (activeComponent) {
      case 'CopingStrategies':
        return <CopingStrategies strategies={communityContent.copingStrategies} />;
      case 'JournalPrompts':
        return <JournalPrompts prompts={communityContent.journalPrompts} />;
      case 'MotivationalQuotes':
        return <MotivationalQuotes quotes={communityContent.motivationalQuotes} />;
      case 'Contribute':
        return <ContributionForm onAddContribution={handleAddContribution} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <div className="loading">Loading community content...</div>;
  }

  return (
      
      <div className="community-container">
        <h1>Mental Health Community</h1>
        <div className="community-content">
          <nav className="community-nav">
            <button onClick={() => setActiveComponent('CopingStrategies')}>Coping Strategies</button>
            <button onClick={() => setActiveComponent('JournalPrompts')}>Journal Prompts</button>
            <button onClick={() => setActiveComponent('MotivationalQuotes')}>Motivational Quotes</button>
            <button onClick={() => setActiveComponent('Contribute')}>Contribute</button>
          </nav>
          <main className="community-main">
            {renderActiveComponent()}
          </main>
        </div>
      </div>

    
  );
};

export default Community;