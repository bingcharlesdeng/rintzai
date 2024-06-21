import React, { useState } from 'react';
import './therapyNotes.css';

const TherapyNotes = ({ notes, onProfileUpdate }) => {
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      const updatedNotes = [
        { id: Date.now(), ...newNote, date: new Date().toISOString() },
        ...(notes || [])
      ];
      onProfileUpdate({ therapyNotes: updatedNotes });
      setNewNote({ title: '', content: '' });
    }
  };

  return (
    <div className="therapy-notes">
      <h2>My Therapy Notes</h2>
      <div className="add-note">
        <input
          type="text"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          placeholder="Note title"
        />
        <textarea
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          placeholder="Note content"
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      {notes && notes.length > 0 ? (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <span className="note-date">{new Date(note.date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No therapy notes recorded. Use this space to reflect on your therapy sessions!</p>
      )}
    </div>
  );
};

export default TherapyNotes;