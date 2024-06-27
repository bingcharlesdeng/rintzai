// /src/components/Mental/PersonalStories.js
import React, { useState, useEffect } from 'react';
import { db, collection, query, getDocs, addDoc, where, orderBy } from '../../firebase/firebase';
import './PersonalStories.css';

const PersonalStories = ({ userId }) => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({ title: '', content: '', anonymous: false });

  useEffect(() => {
    const fetchStories = async () => {
      const storiesRef = collection(db, 'personalStories');
      const q = query(storiesRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const fetchedStories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStories(fetchedStories);
    };
    fetchStories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storyData = {
      ...newStory,
      userId: newStory.anonymous ? null : userId,
      createdAt: new Date(),
    };
    await addDoc(collection(db, 'personalStories'), storyData);
    setStories([storyData, ...stories]);
    setNewStory({ title: '', content: '', anonymous: false });
  };

  return (
    <div className="personal-stories">
      <h2>Share Your Story</h2>
      <form onSubmit={handleSubmit} className="story-form">
        <input
          type="text"
          value={newStory.title}
          onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
          placeholder="Story Title"
          required
        />
        <textarea
          value={newStory.content}
          onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
          placeholder="Share your experience..."
          required
        />
        <label>
          <input
            type="checkbox"
            checked={newStory.anonymous}
            onChange={(e) => setNewStory({ ...newStory, anonymous: e.target.checked })}
          />
          Post anonymously
        </label>
        <button type="submit">Share Story</button>
      </form>
      <h2>Community Stories</h2>
      <div className="stories-list">
        {stories.map(story => (
          <div key={story.id} className="story-item">
            <h3>{story.title}</h3>
            <p>{story.content}</p>
            <span className="story-meta">
              {story.anonymous ? 'Anonymous' : 'User'} | {new Date(story.createdAt.toDate()).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalStories;
