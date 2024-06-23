import React, { useEffect, useRef, useState } from 'react';
import { db, collection, onSnapshot, query, where, orderBy } from '../../firebase/firebase';
import './chatWindow.css';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ selectedConversation, loggedInUser, selectedMessage }) => {
  const [messages, setMessages] = useState([]);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    const fetchConversationMessages = async () => {
      if (selectedConversation) {
        const messagesRef = collection(db, 'messages');
        const q = query(
          messagesRef,
          where('conversationId', '==', selectedConversation.id),
          orderBy('timestamp', 'asc')
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const fetchedMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(fetchedMessages);
          console.log('Fetched messages:', fetchedMessages);
        });

        return () => {
          unsubscribe();
        };
      } else {
        setMessages([]);
      }
    };

    fetchConversationMessages();
  }, [selectedConversation]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (selectedMessage) {
      const messageElement = document.getElementById(selectedMessage.id);
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth' });
        messageElement.classList.add('highlighted');
      }
    }
  }, [selectedMessage]);

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
              isHighlighted={message.id === selectedMessage?.id}
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