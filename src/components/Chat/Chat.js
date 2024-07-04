import React, { useState, useEffect, useRef } from 'react';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';
import ChatInput from './ChatInput';
import UserSearch from './UserSearch';
import ConversationSearch from './ConversationSearch';
import { sendMessage, createNewConversation } from './chatService';
import { db, collection, onSnapshot, query, where, orderBy } from '../../firebase/firebase';
import './chat.css';
import { useUserContext } from '../User/UserContext';
import LoadingSpinner from './LoadingSpinner';

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const chatWindowRef = useRef(null);

  useEffect(() => {
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
      });
  
      return () => unsubscribe();
    }
  }, [user]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setIsSearching(results.length > 0);
  };

  const handleNewChat = () => {
    setIsUserSearchOpen(true);
  };

  const handleCloseUserSearch = () => {
    setIsUserSearchOpen(false);
  };

  const handleStartChat = async (selectedUser) => {
    try {
      setIsLoading(true);
      const existingConversation = conversations.find(conv => 
        conv.participants.includes(selectedUser.id) && conv.participants.includes(user.uid)
      );

      if (existingConversation) {
        handleSelectConversation(existingConversation);
      } else {
        const newConversation = await createNewConversation(user.uid, selectedUser.id);
        handleSelectConversation(newConversation);
      }
      handleCloseUserSearch();
    } catch (error) {
      console.error('Error creating new conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectConversation = (conversation, message = null) => {
    setIsLoading(true);
    setSelectedConversation(conversation);
    setSelectedMessage(message);
    setIsSearching(false);
    setIsLoading(false);

    // Scroll to the selected message or to the bottom of the chat
    setTimeout(() => {
      if (chatWindowRef.current) {
        if (message) {
          chatWindowRef.current.scrollToMessage(message.id);
        } else {
          chatWindowRef.current.scrollToMessage(null); // This will scroll to the bottom
        }
      }
    }, 100); // Small delay to ensure the chat window has updated
  };

  const handleSendMessage = async (message) => {
    if (selectedConversation) {
      try {
        await sendMessage(message, selectedConversation.id, user.uid);
        // Scroll to the bottom after sending a message
        if (chatWindowRef.current) {
          chatWindowRef.current.scrollToMessage(null);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
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
          loggedInUser={user}
        />
        <ConversationList
          conversations={isSearching ? searchResults : conversations}
          onSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
          loggedInUser={user}
          isSearching={isSearching}
        />
      </div>
      <div className="chat-area">
        {selectedConversation ? (
          <>
            <div className="chat-window-container">
              {isLoading ? (
                <div className="loading-container">
                  <LoadingSpinner />
                </div>
              ) : (
                <ChatWindow 
                  selectedConversation={selectedConversation} 
                  loggedInUser={user} 
                  selectedMessage={selectedMessage}
                  ref={chatWindowRef}
                />
              )}
            </div>
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
  );
};

export default Chat;