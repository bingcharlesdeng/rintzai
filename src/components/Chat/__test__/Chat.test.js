import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { UserContext } from '../../User/UserContext';
import Chat from '../Chat';
import { fetchConversationsForUser, sendMessage } from '../messageService';

jest.mock('../messageService');
jest.mock('../../Routes/Navbar', () => () => <div data-testid="navbar-mock" />);

const mockUser = { uid: 'testUser123', name: 'Test User' };
const mockUserContext = { user: mockUser };

const mockConversations = [
  {
    id: 'conv1',
    participants: ['testUser123', 'user456'],
    lastMessage: 'Hello',
    lastMessageTimestamp: new Date(),
  },
];

describe('Chat Component', () => {
  beforeEach(() => {
    fetchConversationsForUser.mockResolvedValue(mockConversations);
    sendMessage.mockResolvedValue();
  });

  it('renders the Chat component and loads conversations', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Chat />
        </UserContext.Provider>
      );
    });

    expect(screen.getByText('New Chat')).toBeInTheDocument();
    expect(fetchConversationsForUser).toHaveBeenCalledWith(mockUser.uid);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('sends a new message', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Chat />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('Hello'));
    const input = screen.getByPlaceholder('Type your message...');
    fireEvent.change(input, { target: { value: 'New message' } });
    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(sendMessage).toHaveBeenCalledWith('New message', 'conv1', mockUser.uid, expect.any(Date));
    });
  });

  it('opens user search modal', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Chat />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('New Chat'));
    expect(screen.getByText('Find a user to chat with')).toBeInTheDocument();
  });

  it('handles empty conversation list', async () => {
    fetchConversationsForUser.mockResolvedValue([]);
    
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Chat />
        </UserContext.Provider>
      );
    });

    expect(screen.getByText('No conversations yet. Start a new chat!')).toBeInTheDocument();
  });

  it('switches between conversations', async () => {
    const mockMultipleConversations = [
      { id: 'conv1', participants: ['testUser123', 'user456'], lastMessage: 'Hello' },
      { id: 'conv2', participants: ['testUser123', 'user789'], lastMessage: 'Hi there' }
    ];
    fetchConversationsForUser.mockResolvedValue(mockMultipleConversations);

    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Chat />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('Hello'));
    expect(screen.getByText('user456')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Hi there'));
    expect(screen.getByText('user789')).toBeInTheDocument();
  });

  it('handles search functionality', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Chat />
        </UserContext.Provider>
      );
    });

    const searchInput = screen.getByPlaceholder('Search conversations...');
    fireEvent.change(searchInput, { target: { value: 'Hello' } });

    await waitFor(() => {
      expect(screen.getByText('Search results for: Hello')).toBeInTheDocument();
    });
  });
});