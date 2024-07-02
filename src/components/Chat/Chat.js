import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';
import ChatInput from './ChatInput';
import UserSearch from './UserSearch';
import ConversationSearch from './ConversationSearch';
import { sendMessage, createNewConversation } from './chatService';
import { db, collection, onSnapshot, query, where, orderBy } from '../../firebase/firebase';
import './chat.css';
import { useUserContext } from '../User/UserContext';

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { user } = useUserContext();

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
        console.log('Fetched user conversations:', updatedConversations);
      });
  
      return () => unsubscribe();
    }
  }, [user]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setIsSearching(results.length > 0);
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

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setIsSearching(false);
    console.log('Selected conversation:', conversation);
  };

  const handleSendMessage = async (message) => {
    if (selectedConversation) {
      try {
        await sendMessage(message, selectedConversation.id, user.uid);
        console.log('Message sent:', message);
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
            <ChatWindow 
              selectedConversation={selectedConversation} 
              loggedInUser={user} 
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
  );
};

export default Chat;