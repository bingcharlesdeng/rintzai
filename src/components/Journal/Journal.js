import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import './journal.css';
import JournalEntryForm from './JournalEntryForm';
import PastEntryList from './PastEntryList';
import EntryDetails from './EntryDetails';
import JournalSearch from './JournalSearch';
import Navbar from '../Navbar';

const Journal = () => {
  const { user } = useUserContext();
  const [pastEntries, setPastEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getJournalEntries = async () => {
    const entriesRef = collection(db, 'journalEntries');
    const q = query(entriesRef, where('userId', '==', user.uid), orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);
    const entries = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPastEntries(entries);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
  };

  const handleBackClick = () => {
    setSelectedEntry(null);
  };

  useEffect(() => {
    getJournalEntries();
  }, [user.uid]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const filteredEntries = pastEntries.filter((entry) =>
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Navbar/>
    <div className="journal-container">
      <h2 className="journal-title">My Journal</h2>
      <JournalSearch onSearch={handleSearch} />
      {selectedEntry ? (
        <EntryDetails entry={selectedEntry} onBackClick={handleBackClick} />
      ) : (
        <>
          <JournalEntryForm onSave={getJournalEntries} />
          <PastEntryList entries={filteredEntries} onEntryClick={handleEntryClick} />
        </>
      )}
    </div>
    </>
  );
};

export default Journal;