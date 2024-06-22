import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs, addDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

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
import PastEntryList from './PastEntryList';
import EntryDetails from './EntryDetails';
import ErrorBoundary from './ErrorBoundary';
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
    if (user && user.uid) {
      fetchEntries();
      fetchGratitudes();
    }
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
      const fetchedEntries = querySnapshot.docs.map(doc => {
        const data = doc.data();
        let formattedDate;
        if (data.date && typeof data.date.toDate === 'function') {
          formattedDate = data.date.toDate();
        } else if (data.date instanceof Date) {
          formattedDate = data.date;
        } else if (typeof data.date === 'string') {
          formattedDate = new Date(data.date);
        } else {
          console.warn(`Invalid date format for entry ${doc.id}:`, data.date);
          formattedDate = new Date();
        }
        return {
          id: doc.id,
          ...data,
          date: formattedDate
        };
      });
      console.log('Fetched entries:', fetchedEntries);
      setEntries(fetchedEntries);
    } catch (error) {
      console.error('Error fetching entries:', error);
      setEntries([]);
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
        ...doc.data(),
        date: doc.data().date.toDate()
      }));
      console.log('Fetched gratitudes:', fetchedGratitudes);
      setGratitudes(fetchedGratitudes);
    } catch (error) {
      console.error('Error fetching gratitudes:', error);
      setGratitudes([]);
    }
  };

  const addEntry = async (newEntry) => {
    console.log('Adding new entry:', newEntry);
    try {
      const docRef = await addDoc(collection(db, 'journalEntries'), {
        ...newEntry,
        userId: user.uid,
        date: serverTimestamp()
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
        date: serverTimestamp()
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

  const filteredEntries = entries.filter(entry => {
    if (!entry || !entry.content || !entry.title) {
      console.log('Invalid entry:', entry);
      return false;
    }
    
    const contentMatch = entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const titleMatch = entry.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return contentMatch || titleMatch;
  });


  console.log('Filtered entries:', filteredEntries);

  const highlightSearchTerm = (text) => {
    if (!searchTerm || !text) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <Navbar />
      <div className="journal-container">
        <h1 className="journal-title">My Journal</h1>
        <div className="journal-layout">
          <div className="journal-sidebar">
            <SearchBar 
              entries={entries}
              onSearch={handleSearch}
              onEntrySelect={handleEntrySelect}
            />
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
            <PastEntryList 
              entries={filteredEntries}
              onEntryClick={handleEntrySelect}
              highlightSearchTerm={highlightSearchTerm}
            />
            {selectedEntry && (
              <EntryDetails
                entry={selectedEntry}
                onBackClick={() => setSelectedEntry(null)}
                highlightSearchTerm={highlightSearchTerm}
              />
            )}
          </div>
          <div className="journal-insights">
            <JournalInsights entries={entries} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Journal;