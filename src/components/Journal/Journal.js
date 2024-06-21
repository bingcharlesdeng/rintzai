import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useUserContext } from '../UserContext';
import JournalEntryForm from './JournalEntryForm';
import JournalEntryList from './JournalEntryList';
import JournalInsights from './JournalInsights';
import JournalCalendar from './JournalCalendar';
import MoodTracker from './MoodTracker';
import TagCloud from './TagCloud';
import SearchBar from './SearchBar';
import JournalPrompts from './JournalPrompts';
import GratitudeList from './GratitudeList';
import './journal.css';
import Navbar from '../Navbar';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [gratitudes, setGratitudes] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    console.log('Journal component mounted');
    fetchEntries();
    fetchGratitudes();
  }, [user]);

  const fetchEntries = async () => {
    console.log('Fetching journal entries');
    setIsLoading(true);
    try {
      const entriesRef = collection(db, 'journalEntries');
      const q = query(
        entriesRef, 
        where('userId', '==', user.uid),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedEntries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched entries:', fetchedEntries);
      setEntries(fetchedEntries);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGratitudes = async () => {
    console.log('Fetching gratitudes');
    try {
      const gratitudesRef = collection(db, 'gratitudes');
      const q = query(
        gratitudesRef,
        where('userId', '==', user.uid),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedGratitudes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched gratitudes:', fetchedGratitudes);
      setGratitudes(fetchedGratitudes);
    } catch (error) {
      console.error('Error fetching gratitudes:', error);
    }
  };

  const addEntry = async (newEntry) => {
    console.log('Adding new entry:', newEntry);
    try {
      const docRef = await addDoc(collection(db, 'journalEntries'), {
        ...newEntry,
        userId: user.uid,
        date: new Date()
      });
      console.log('New entry added with ID:', docRef.id);
      fetchEntries();
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const addGratitude = async (newGratitude) => {
    console.log('Adding new gratitude:', newGratitude);
    try {
      const docRef = await addDoc(collection(db, 'gratitudes'), {
        content: newGratitude,
        userId: user.uid,
        date: new Date()
      });
      console.log('New gratitude added with ID:', docRef.id);
      fetchGratitudes();
    } catch (error) {
      console.error('Error adding gratitude:', error);
    }
  };

  const handleEntrySelect = (entry) => {
    console.log('Selected entry:', entry);
    setSelectedEntry(entry);
  };

  const handleFilterChange = (newFilter) => {
    console.log('Filter changed to:', newFilter);
    setFilter(newFilter);
  };

  const handleSearch = (term) => {
    console.log('Search term:', term);
    setSearchTerm(term);
  };

  const handleJournalPromptSubmit = (entry, prompt) => {
    console.log('Journal prompt submission:', entry, prompt);
    addEntry({
      title: prompt,
      content: entry,
      mood: 'neutral',
      tags: ['prompt']
    });
  };

  const filteredEntries = entries
    .filter(entry => {
      if (filter === 'all') return true;
      return entry.mood === filter;
    })
    .filter(entry =>
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <Navbar /> 
      <div className="journal-container">
        <h1 className="journal-title">My Journal</h1>
        <div className="journal-layout">
          <div className="journal-sidebar">
            <SearchBar onSearch={handleSearch} />
            <JournalCalendar entries={entries} onSelectDate={handleEntrySelect} />
            <MoodTracker entries={entries} onFilterChange={handleFilterChange} />
            <TagCloud entries={entries} onTagSelect={handleSearch} />
          </div>
          <div className="journal-main">
            <JournalEntryForm onAddEntry={addEntry} />
            <JournalPrompts onJournalSubmit={handleJournalPromptSubmit} />
            <GratitudeList gratitudes={gratitudes} onAddGratitude={addGratitude} />
            <JournalEntryList 
              entries={filteredEntries}
              onEntrySelect={handleEntrySelect}
              selectedEntry={selectedEntry}
            />
          </div>
          <div className="journal-insights">
            <JournalInsights entries={entries} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Journal;