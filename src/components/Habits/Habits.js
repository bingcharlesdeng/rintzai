import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import HabitList from './HabitList';
import CreateHabit from './CreateHabit';
import HabitCalendar from './HabitCalendar';
import HabitStats from './HabitStats';
import HabitReminders from './HabitReminders';
import { fetchUserHabits, updateUserHabits } from './habitService';
import './Habits.css';
import Navbar from '../Routes/Navbar';

const Habits = () => {
  const { user } = useUserContext();
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHabits = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const userHabits = await fetchUserHabits(user.uid);
          setHabits(userHabits);
        }
      } catch (error) {
        console.error('Error loading habits:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHabits();
  }, [user]);

  const handleAddHabit = async (newHabit) => {
    try {
      const updatedHabits = [...habits, { ...newHabit, id: Date.now().toString() }];
      await updateUserHabits(user.uid, updatedHabits);
      setHabits(updatedHabits);
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const handleUpdateHabit = async (updatedHabit) => {
    try {
      const updatedHabits = habits.map(habit => 
        habit.id === updatedHabit.id ? updatedHabit : habit
      );
      await updateUserHabits(user.uid, updatedHabits);
      setHabits(updatedHabits);
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    try {
      const updatedHabits = habits.filter(habit => habit.id !== habitId);
      await updateUserHabits(user.uid, updatedHabits);
      setHabits(updatedHabits);
      if (selectedHabit && selectedHabit.id === habitId) {
        setSelectedHabit(null);
      }
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  const handleHabitSelect = (habit) => {
    setSelectedHabit(habit);
  };

  if (isLoading) {
    return <div className="loading">Loading habits...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="habits-container">
        <h1>Habit Tracker</h1>
        <div className="habits-content">
          <div className="habits-sidebar">
            <CreateHabit onAddHabit={handleAddHabit} />
            <HabitList 
              habits={habits}
              onHabitSelect={handleHabitSelect}
              onDeleteHabit={handleDeleteHabit}
            />
          </div>
          <div className="habits-main">
            {selectedHabit ? (
              <>
                <HabitCalendar 
                  habit={selectedHabit}
                  onUpdateHabit={handleUpdateHabit}
                />
                <HabitStats habit={selectedHabit} />
              </>
            ) : (
              <p>Select a habit to view details</p>
            )}
          </div>
          <div className="habits-sidebar">
            <HabitReminders 
              habits={habits}
              onUpdateHabit={handleUpdateHabit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Habits;