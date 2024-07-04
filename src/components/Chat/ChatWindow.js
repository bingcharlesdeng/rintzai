import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { db, collection, onSnapshot, query, orderBy } from '../../firebase/firebase';
import './chatWindow.css';
import ChatMessage from './ChatMessage';
import LoadingSpinner from './LoadingSpinner';

const ChatWindow = forwardRef(({ selectedConversation, loggedInUser, selectedMessage }, ref) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatWindowRef = useRef(null);
  const selectedMessageRef = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollToMessage: (messageId) => {
      const messageElement = document.getElementById(messageId);
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
  }));

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

  useEffect(() => {
    if (selectedMessage && ref.current) {
      ref.current.scrollToMessage(selectedMessage.id);
    }
  }, [selectedMessage, ref]);

  if (loading) {
    return <div className="loading"><LoadingSpinner /></div>;
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
              isHighlighted={selectedMessage && selectedMessage.id === message.id}
              ref={selectedMessage && selectedMessage.id === message.id ? selectedMessageRef : null}
            />
          ))
        ) : (
          <div className="empty-chat-placeholder">No messages yet</div>
        )}
      </div>
    </div>
  );
});

export default ChatWindow;