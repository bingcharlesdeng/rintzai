import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './profile.css';

const Profile = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, updatedUser);
      setEditMode(false);
      console.log('User information updated successfully:', updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={updatedUser?.coverImage || 'default-cover.jpg'} alt="Cover" className="profile-cover" />
        <div className="profile-info">
          <img src={updatedUser?.avatarUrl || 'default-avatar.jpg'} alt="User Avatar" className="profile-avatar" />
          {editMode ? (
            <input
              type="text"
              name="name"
              value={updatedUser?.name || ''}
              onChange={handleChange}
              className="profile-name-input"
            />
          ) : (
            <h2 className="profile-name">{updatedUser?.name || 'Unknown User'}</h2>
          )}
          {editMode ? (
            <input
              type="text"
              name="location"
              value={updatedUser?.location || ''}
              onChange={handleChange}
              className="profile-location-input"
            />
          ) : (
            <p className="profile-location">{updatedUser?.location || 'Unknown Location'}</p>
          )}
        </div>
      </div>
      <div className="profile-sections">
        <div className="profile-section">
          <h3 className="section-title">About</h3>
          {editMode ? (
            <textarea
              name="about"
              value={updatedUser?.about || ''}
              onChange={handleChange}
              className="section-content-input"
            />
          ) : (
            <p className="section-content">{updatedUser?.about || 'No information provided.'}</p>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">Mental Health Journey</h3>
          {editMode ? (
            <textarea
              name="mentalHealthJourney"
              value={updatedUser?.mentalHealthJourney || ''}
              onChange={handleChange}
              className="section-content-input"
            />
          ) : (
            <p className="section-content">{updatedUser?.mentalHealthJourney || 'No information provided.'}</p>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">Favorite Quotes</h3>
          {editMode ? (
            <textarea
              name="favoriteQuotes"
              value={updatedUser?.favoriteQuotes?.join('\n') || ''}
              onChange={(e) => {
                const quotes = e.target.value.split('\n');
                setUpdatedUser((prevUser) => ({
                  ...prevUser,
                  favoriteQuotes: quotes,
                }));
              }}
              className="section-content-input"
            />
          ) : (
            <ul className="quotes-list">
              {updatedUser?.favoriteQuotes?.map((quote, index) => (
                <li key={index} className="quote-item">
                  {quote}
                </li>
              )) || 'No quotes added.'}
            </ul>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">Hobbies</h3>
          {editMode ? (
            <textarea
              name="hobbies"
              value={updatedUser?.hobbies?.join(', ') || ''}
              onChange={(e) => {
                const hobbies = e.target.value.split(',').map((hobby) => hobby.trim());
                setUpdatedUser((prevUser) => ({
                  ...prevUser,
                  hobbies: hobbies,
                }));
              }}
              className="section-content-input"
            />
          ) : (
            <p className="section-content">{updatedUser?.hobbies?.join(', ') || 'No hobbies added.'}</p>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">Occupation</h3>
          {editMode ? (
            <input
              type="text"
              name="occupation"
              value={updatedUser?.occupation || ''}
              onChange={handleChange}
              className="section-content-input"
            />
          ) : (
            <p className="section-content">{updatedUser?.occupation || 'No occupation provided.'}</p>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">Education</h3>
          {editMode ? (
            <input
              type="text"
              name="education"
              value={updatedUser?.education || ''}
              onChange={handleChange}
              className="section-content-input"
            />
          ) : (
            <p className="section-content">{updatedUser?.education || 'No education provided.'}</p>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">Age</h3>
          {editMode ? (
            <input
              type="number"
              name="age"
              value={updatedUser?.age || ''}
              onChange={handleChange}
              className="section-content-input"
            />
          ) : (
            <p className="section-content">{updatedUser?.age || 'No age provided.'}</p>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">Gender</h3>
          {editMode ? (
            <select
              name="gender"
              value={updatedUser?.gender || ''}
              onChange={handleChange}
              className="section-content-input"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="section-content">{updatedUser?.gender || 'No gender provided.'}</p>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">Mental Health</h3>
          <div className="mental-health-info">
            <div className="info-item">
              <span className="info-label">Diagnoses:</span>
              {editMode ? (
                <textarea
                  name="diagnoses"
                  value={updatedUser?.diagnoses?.join(', ') || ''}
                  onChange={(e) => {
                    const diagnoses = e.target.value.split(',').map((diagnosis) => diagnosis.trim());
                    setUpdatedUser((prevUser) => ({
                      ...prevUser,
                      diagnoses: diagnoses,
                    }));
                  }}
                  className="section-content-input"
                />
              ) : (
                <span className="info-value">{updatedUser?.diagnoses?.join(', ') || 'No diagnoses provided.'}</span>
              )}
            </div>
            <div className="info-item">
              <span className="info-label">Treatments:</span>
              {editMode ? (
                <textarea
                  name="treatments"
                  value={updatedUser?.treatments?.join(', ') || ''}
                  onChange={(e) => {
                    const treatments = e.target.value.split(',').map((treatment) => treatment.trim());
                    setUpdatedUser((prevUser) => ({
                      ...prevUser,
                      treatments: treatments,
                    }));
                  }}
                  className="section-content-input"
                />
              ) : (
                <span className="info-value">
                  {updatedUser?.treatments?.join(', ') || 'No treatments provided.'}
                </span>
              )}
            </div>
            <div className="info-item">
              <span className="info-label">Medications:</span>
              {editMode ? (
                <textarea
                  name="medications"
                  value={updatedUser?.medications?.join(', ') || ''}
                  onChange={(e) => {
                    const medications = e.target.value.split(',').map((medication) => medication.trim());
                    setUpdatedUser((prevUser) => ({
                      ...prevUser,
                      medications: medications,
                    }));
                  }}
                  className="section-content-input"
                />
              ) : (
                <span className="info-value">
                  {updatedUser?.medications?.join(', ') || 'No medications provided.'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="profile-actions">
        {editMode ? (
          <button onClick={handleSave} className="save-button">
            Save
          </button>
        ) : (
          <button onClick={handleEdit} className="edit-button">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;