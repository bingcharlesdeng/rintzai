import React, { useEffect, useRef, useState } from 'react';
import { db, collection, onSnapshot, query, orderBy } from '../../firebase/firebase';
import './chatWindow.css';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ selectedConversation, loggedInUser }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (selectedConversation) {
      setLoading(true);
      const messagesRef = collection(db, 'conversations', selectedConversation.id, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
        setLoading(false);
        console.log('Fetched messages:', fetchedMessages);
      }, (error) => {
        console.error('Error fetching messages:', error);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return <div className="loading">Loading messages...</div>;
  }

  return (
    <div className="chat-window" ref={chatWindowRef}>
      <div className="message-list">
        {messages.length > 0 ? (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              loggedInUser={loggedInUser}
              messageId={message.id}
            />
          ))
        ) : (
          <div className="empty-chat-placeholder">No messages yet</div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;