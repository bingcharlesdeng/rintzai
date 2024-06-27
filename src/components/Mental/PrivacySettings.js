// src/components/Mental/PrivacySettings.js
import React, { useState } from 'react';
import { db, doc, deleteDoc, collection, query, where, getDocs } from '../../firebase/firebase';
import { useUserContext } from '../User/UserContext';
import './PrivacySettings.css';

const PrivacySettings = ({ userData, updateUserData }) => {
  const { user, logout } = useUserContext();
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSettingChange = (setting, value) => {
    const updatedPrivacySettings = { ...userData.privacySettings, [setting]: value };
    updateUserData({ privacySettings: updatedPrivacySettings });
  };

  const exportUserData = async () => {
    setIsExporting(true);
    try {
      const userDataCopy = { ...userData };
      delete userDataCopy.id; // Remove the document ID from the exported data

      const jsonData = JSON.stringify(userDataCopy, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `user_data_${user.uid}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting user data:', error);
      alert('An error occurred while exporting your data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const deleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        // Delete user data from Firestore
        await deleteDoc(doc(db, 'users', userData.id));

        // Delete user's personal stories
        const storiesRef = collection(db, 'personalStories');
        const q = query(storiesRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        // Sign out the user
        await logout();

        // Redirect to home page or show a message
        window.location.href = '/';
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while deleting your account. Please try again.');
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="privacy-settings">
      <h2>Privacy Settings</h2>
      <div className="setting">
        <label htmlFor="shareProgress">Share Progress with Healthcare Provider</label>
        <input
          type="checkbox"
          id="shareProgress"
          checked={userData.privacySettings?.shareProgress || false}
          onChange={(e) => handleSettingChange('shareProgress', e.target.checked)}
        />
      </div>
      <div className="setting">
        <label htmlFor="anonymousStories">Post Stories Anonymously by Default</label>
        <input
          type="checkbox"
          id="anonymousStories"
          checked={userData.privacySettings?.anonymousStories || false}
          onChange={(e) => handleSettingChange('anonymousStories', e.target.checked)}
        />
      </div>
      <div className="setting">
        <label htmlFor="dataRetention">Data Retention Period</label>
        <select
          id="dataRetention"
          value={userData.privacySettings?.dataRetention || '1year'}
          onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
        >
          <option value="3months">3 Months</option>
          <option value="6months">6 Months</option>
          <option value="1year">1 Year</option>
          <option value="indefinite">Indefinite</option>
        </select>
      </div>
      <div className="data-export">
        <h3>Export Your Data</h3>
        <p>Download a copy of all your data stored in our system.</p>
        <button onClick={exportUserData} disabled={isExporting}>
          {isExporting ? 'Exporting...' : 'Export Data'}
        </button>
      </div>
      <div className="account-deletion">
        <h3>Delete Your Account</h3>
        <p>Permanently delete your account and all associated data.</p>
        <button className="delete-account" onClick={deleteAccount} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;