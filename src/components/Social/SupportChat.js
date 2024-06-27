import React, { useState, useEffect, useRef } from 'react';
import { fetchChatMessages, sendChatMessage } from './socialService';
import './SupportChat.css';

const SupportChat = ({ userData }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    const loadMessages = async () => {
      const fetchedMessages = await fetchChatMessages();
      setMessages(fetchedMessages);
    };
    loadMessages();
    // Set up real-time listener for new messages here
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const sentMessage = await sendChatMessage(userData.id, newMessage);
        setMessages([...messages, sentMessage]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="support-chat">
      <h2>Support Chat</h2>
      <div className="chat-messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.userId === userData.id ? 'sent' : 'received'}`}>
            <p>{message.content}</p>
            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default SupportChat;