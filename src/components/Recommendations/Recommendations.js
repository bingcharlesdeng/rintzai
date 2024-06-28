import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import DailyTip from './DailyTip';
import ActivitySuggestions from './ActivitySuggestions';
import MoodBasedRecommendations from './MoodBasedRecommendations';
import LongTermGoals from './LongTermGoals';
import CustomizedPlan from './CustomizedPlan';
import { fetchUserRecommendations, generateRecommendations, provideFeedback } from './recommendationService';
import './Recommendations.css';
import Navbar from '../Routes/Navbar';

const Recommendations = () => {
  const { user } = useUserContext();
  const [recommendationsData, setRecommendationsData] = useState(null);
  const [activeComponent, setActiveComponent] = useState('DailyTip');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecommendations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (user) {
          console.log('Fetching recommendations for user:', user.uid);
          const userData = await fetchUserRecommendations(user.uid);
          console.log('User data for recommendations:', userData);
          if (!userData) {
            throw new Error('No user data found');
          }
          const generatedRecommendations = await generateRecommendations(userData);
          console.log('Generated recommendations:', generatedRecommendations);
          setRecommendationsData(generatedRecommendations);
        }
      } catch (error) {
        console.error('Error loading recommendations:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendations();
  }, [user]);

  const handleFeedback = async (recommendationType, recommendationId, rating) => {
    try {
      await provideFeedback(user.uid, recommendationType, recommendationId, rating);
      console.log('Feedback provided successfully');
      // Refresh recommendations after feedback
      const userData = await fetchUserRecommendations(user.uid);
      const updatedRecommendations = await generateRecommendations(userData);
      setRecommendationsData(updatedRecommendations);
    } catch (error) {
      console.error('Error providing feedback:', error);
    }
  };

  const renderActiveComponent = () => {
    console.log('Rendering active component:', activeComponent);
    if (!recommendationsData) {
      return null;
    }
    switch (activeComponent) {
      case 'DailyTip':
        return <DailyTip data={recommendationsData.dailyTip} onFeedback={handleFeedback} />;
      case 'ActivitySuggestions':
        return <ActivitySuggestions data={recommendationsData.activitySuggestions} onFeedback={handleFeedback} />;
      case 'MoodBasedRecommendations':
        return <MoodBasedRecommendations data={recommendationsData.moodBasedRecommendations} onFeedback={handleFeedback} />;
      case 'LongTermGoals':
        return <LongTermGoals data={recommendationsData.longTermGoals} onFeedback={handleFeedback} />;
      case 'CustomizedPlan':
        return <CustomizedPlan data={recommendationsData.customizedPlan} onFeedback={handleFeedback} />;
      default:
        console.warn('Unknown active component:', activeComponent);
        return null;
    }
  };

  if (isLoading) {
    return <div className="loading">Loading personalized recommendations...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!recommendationsData) {
    return <div className="no-data">No recommendations available. Please try again later.</div>;
  }

  return (
    
      <div className="recommendations-container">
        <h1>Your Personalized Recommendations</h1>
        <div className="recommendations-content">
          <nav className="recommendations-nav">
            <button onClick={() => setActiveComponent('DailyTip')}>Daily Tip</button>
            <button onClick={() => setActiveComponent('ActivitySuggestions')}>Activity Suggestions</button>
            <button onClick={() => setActiveComponent('MoodBasedRecommendations')}>Mood-Based Recommendations</button>
            <button onClick={() => setActiveComponent('LongTermGoals')}>Long-Term Goals</button>
            <button onClick={() => setActiveComponent('CustomizedPlan')}>Customized Plan</button>
          </nav>
          <main className="recommendations-main">
            {renderActiveComponent()}
          </main>
        </div>
      </div>
    
  );
};

export default Recommendations;