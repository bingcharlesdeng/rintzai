import React, { useState, useEffect } from 'react';
import { useUserContext } from '../User/UserContext';
import GoalList from './GoalList';
import GoalForm from './GoalForm';
import GoalCategories from './GoalCategories';
import GoalReminders from './GoalReminders';
import GoalShare from './GoalShare';
import GoalVisualization from './GoalVisualization';
import MoodJournalIntegration from './MoodJournalIntegration';
import { db, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from '../../firebase/firebase';
import './Goals.css';
import Navbar from '../Routes/Navbar';

const Goals = () => {
  const { user } = useUserContext();
  const [goals, setGoals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [moodData, setMoodData] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    fetchGoals();
    fetchMoodData();
    fetchJournalEntries();
  }, [user]);

  const fetchGoals = async () => {
    if (user) {
      const goalsRef = collection(db, 'goals');
      const q = query(goalsRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const fetchedGoals = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGoals(fetchedGoals);
    }
  };

  const fetchMoodData = async () => {
    if (user) {
      const moodRef = collection(db, 'moodEntries');
      const q = query(moodRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const fetchedMoodData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMoodData(fetchedMoodData);
    }
  };

  const fetchJournalEntries = async () => {
    if (user) {
      const journalRef = collection(db, 'journalEntries');
      const q = query(journalRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const fetchedJournalEntries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJournalEntries(fetchedJournalEntries);
    }
  };

  const addGoal = async (newGoal) => {
    const goalWithUser = { ...newGoal, userId: user.uid };
    const docRef = await addDoc(collection(db, 'goals'), goalWithUser);
    setGoals([...goals, { id: docRef.id, ...goalWithUser }]);
  };

  const updateGoal = async (id, updatedGoal) => {
    await updateDoc(doc(db, 'goals', id), updatedGoal);
    setGoals(goals.map(goal => goal.id === id ? { ...goal, ...updatedGoal } : goal));
  };

  const deleteGoal = async (id) => {
    await deleteDoc(doc(db, 'goals', id));
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const filteredGoals = selectedCategory === 'All' 
    ? goals 
    : goals.filter(goal => goal.category === selectedCategory);

  const handleShareGoal = (goal) => {
    setSelectedGoal(goal);
    setShowShareModal(true);
  };

  return (
    
    <div className="goals-container">
      <h1>Goal Planner</h1>
      <GoalCategories 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      <GoalForm onAddGoal={addGoal} />
      <GoalList 
        goals={filteredGoals} 
        onUpdateGoal={updateGoal} 
        onDeleteGoal={deleteGoal}
        onShareGoal={handleShareGoal}
      />
      <GoalReminders goals={goals} />
      <GoalVisualization goals={goals} moodData={moodData} />
      <MoodJournalIntegration 
        goals={goals}
        moodData={moodData}
        journalEntries={journalEntries}
        onUpdateGoal={updateGoal}
      />
      {showShareModal && (
        <GoalShare 
          goal={selectedGoal} 
          onClose={() => setShowShareModal(false)} 
        />
      )}
    </div>
    

  );
};

export default Goals;