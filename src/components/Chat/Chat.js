import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';
import ChatInput from './ChatInput';
import UserSearch from './UserSearch';
import ConversationSearch from './ConversationSearch';
import { sendMessage, createNewConversation, fetchConversationsForUser } from './messageService';
import { db, collection, onSnapshot, query, where, orderBy } from '../../firebase/firebase';
import './chat.css';
import { useUserContext } from '../User/UserContext';
import Navbar from '../Routes/Navbar';

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchUserConversations = async () => {
      if (user) {
        const conversationsRef = collection(db, 'conversations');
        const q = query(
          conversationsRef,
          where('participants', 'array-contains', user.uid),
          orderBy('lastMessageTimestamp', 'desc')
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const updatedConversations = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setConversations(updatedConversations);
          console.log('Fetched user conversations:', updatedConversations);
        });
  
        return () => {
          unsubscribe();
        };
      }
    };
  
    fetchUserConversations();
  }, [user]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    console.log('Search results:', results);
  };

  const handleNewChat = () => {
    setIsUserSearchOpen(true);
  };

  const handleCloseUserSearch = () => {
    setIsUserSearchOpen(false);
  };

  const handleStartChat = async (selectedUser) => {
    try {
      const existingConversation = conversations.find(conv => 
        conv.participants.includes(selectedUser.id) && conv.participants.includes(user.uid)
      );

      if (existingConversation) {
        setSelectedConversation(existingConversation);
      } else {
        const newConversation = await createNewConversation(user.uid, selectedUser.id);
        setSelectedConversation(newConversation);
      }
      handleCloseUserSearch();
      console.log('Started chat with:', selectedUser.name);
    } catch (error) {
      console.error('Error creating new conversation:', error);
    }
  };

  const handleSelectConversation = (conversation, message = null) => {
    setSelectedConversation(conversation);
    setSelectedMessage(message);
    console.log('Selected conversation:', conversation);
    if (message) {
      console.log('Selected message:', message);
    }
  };

  const handleSendMessage = (message) => {
    if (selectedConversation) {
      const currentTimestamp = new Date();
      sendMessage(message, selectedConversation.id, user.uid, currentTimestamp)
        .then(() => {
          console.log('Message sent:', message);
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="chat-app">
        <div className="sidebar">
          <div className="header">
            <button className="new-chat-button" onClick={handleNewChat}>
              New Chat
            </button>
          </div>
          <ConversationSearch
            conversations={conversations}
            onSearchResults={handleSearchResults}
          />
          <ConversationList
            conversations={conversations}
            searchResults={searchResults}
            onSelectConversation={handleSelectConversation}
            selectedConversation={selectedConversation}
            loggedInUser={user}
          />
        </div>
        <div className="chat-area">
          {selectedConversation ? (
            <>
              <ChatWindow 
                selectedConversation={selectedConversation} 
                loggedInUser={user} 
                selectedMessage={selectedMessage}
              />
              <ChatInput onSendMessage={handleSendMessage} />
            </>
          ) : (
            <div className="no-chat-selected">Select a conversation or start a new chat</div>
          )}
        </div>
        {isUserSearchOpen && (
          <UserSearch onClose={handleCloseUserSearch} onStartChat={handleStartChat} />
        )}
      </div>
    </>
  );
};

export default Chat;