import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import DailyAffirmation from './DailyAffirmation';
import AffirmationList from './AffirmationList';
import CreateAffirmation from './CreateAffirmation';
import AffirmationCategories from './AffirmationCategories';
import AffirmationReminders from './AffirmationReminders';
import { fetchUserAffirmations, updateUserAffirmations } from './affirmationService';
import './Affirmations.css';
import Navbar from '../Routes/Navbar';

const Affirmations = () => {
  const { user } = useUserContext();
  const [userAffirmations, setUserAffirmations] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAffirmations = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const data = await fetchUserAffirmations(user.uid);
          setUserAffirmations(data);
        }
      } catch (error) {
        console.error('Error loading affirmations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAffirmations();
  }, [user]);

  const handleAddAffirmation = async (newAffirmation) => {
    try {
      const updatedAffirmations = [...userAffirmations.customAffirmations, newAffirmation];
      await updateUserAffirmations(user.uid, { customAffirmations: updatedAffirmations });
      setUserAffirmations({ ...userAffirmations, customAffirmations: updatedAffirmations });
    } catch (error) {
      console.error('Error adding affirmation:', error);
    }
  };

  const handleDeleteAffirmation = async (affirmationId) => {
    try {
      const updatedAffirmations = userAffirmations.customAffirmations.filter(
        affirmation => affirmation.id !== affirmationId
      );
      await updateUserAffirmations(user.uid, { customAffirmations: updatedAffirmations });
      setUserAffirmations({ ...userAffirmations, customAffirmations: updatedAffirmations });
    } catch (error) {
      console.error('Error deleting affirmation:', error);
    }
  };

  const handleUpdateReminders = async (newReminders) => {
    try {
      await updateUserAffirmations(user.uid, { reminders: newReminders });
      setUserAffirmations({ ...userAffirmations, reminders: newReminders });
    } catch (error) {
      console.error('Error updating reminders:', error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading affirmations...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="affirmations-container">
        <h1>Daily Affirmations</h1>
        <div className="affirmations-content">
          <div className="affirmations-main">
            <DailyAffirmation affirmation={userAffirmations.dailyAffirmation} />
            <CreateAffirmation onAddAffirmation={handleAddAffirmation} />
            <AffirmationCategories 
              categories={['All', ...new Set(userAffirmations.customAffirmations.map(a => a.category))]}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
            <AffirmationList 
              affirmations={userAffirmations.customAffirmations}
              activeCategory={activeCategory}
              onDeleteAffirmation={handleDeleteAffirmation}
            />
          </div>
          <div className="affirmations-sidebar">
            <AffirmationReminders 
              reminders={userAffirmations.reminders}
              onUpdateReminders={handleUpdateReminders}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Affirmations;