import React, { useState } from 'react';
import './messageModal.css';
import { sendMessage } from '../../firebase/messageServices';
import { useUserContext } from '../UserContext';

const MessageModal = ({ recipientId, recipientName, onClose }) => {
  const [message, setMessage] = useState('');
  const { user } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMessage(user.uid, recipientId, message);
      onClose();
      // Show success message to user
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error message to user
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Send Message to {recipientName}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="modal-actions">
            <button type="submit" className="send-button">Send Message</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageModal;