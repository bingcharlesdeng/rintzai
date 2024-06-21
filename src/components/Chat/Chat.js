import React, { useState, useEffect, useContext } from 'react';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';
import ChatInput from './ChatInput';
import NewChatModal from './NewChatModal';
import ConversationSearch from './ConversationSearch';
import { sendMessage, fetchConversationsForUser, createNewConversation } from './messageService';
import { db, collection, onSnapshot, query, where, orderBy } from '../../firebase/firebase';

import './chat.css';
import UserContext from '../UserContext';
import Navbar from '../Navbar';


const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [searchedConversations, setSearchedConversations] = useState([]);
  const { user } = useContext(UserContext);
  const [searchResults, setSearchResults] = useState([]);

  
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
          setSearchedConversations(updatedConversations);
          console.log('Fetched user conversations:', updatedConversations);
        });
  
        return () => {
          unsubscribe();
        };
      }
    };
  
    fetchUserConversations();
  }, [user]);

  const scrollToMessage = (messageId) => {
    const chatWindowElement = document.querySelector('.chat-window');
    const messageElement = document.getElementById(messageId);

    if (chatWindowElement && messageElement) {
      const scrollOffset = messageElement.offsetTop - chatWindowElement.offsetTop;
      chatWindowElement.scrollTop = scrollOffset;
    }
  };

  const handleSearchResults = (matchingConversations) => {
    setSearchResults(matchingConversations);
    console.log('Searched conversations:', matchingConversations);
  };

  const handleNewChat = () => {
    setIsNewChatModalOpen(true);
  };

  const handleCloseNewChatModal = () => {
    setIsNewChatModalOpen(false);
  };

  const handleStartChat = async (selectedUser) => {
    try {
      const newConversation = await createNewConversation(user.uid, selectedUser.id);
      setSelectedConversation(newConversation);
      handleCloseNewChatModal();
      console.log('Started new conversation:', newConversation);
    } catch (error) {
      console.error('Error creating new conversation:', error);
    }
  };

  const handleSelectConversation = (conversation, messageId) => {
    setSelectedConversation(conversation);
    if (messageId) {
      scrollToMessage(messageId);
            // Scroll to the specific message in the chat window
    }

    console.log('Selected conversation:', conversation);

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

  const handleSelectUser = async (user) => {
    const existingConversation = conversations.find((conversation) =>
      conversation.participants.includes(user.id) && conversation.participants.includes(user.uid)
    );

    if (existingConversation) {
      setSelectedConversation(existingConversation);
      console.log('Selected existing conversation:', existingConversation);
    } else {
      try {
        const newConversation = await createNewConversation(user.id, user.uid);
        setSelectedConversation(newConversation);
        console.log('Created new conversation:', newConversation);
      } catch (error) {
        console.error('Error creating new conversation:', error);
      }
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
          {isNewChatModalOpen && (
            <NewChatModal onClose={handleCloseNewChatModal} onStartChat={handleStartChat} />
          )}
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
              <ChatWindow selectedConversation={selectedConversation} loggedInUser={user} />
              <ChatInput onSendMessage={handleSendMessage} />
            </>
          ) : (
            <div className="no-chat-selected">Select a conversation to start chatting</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;