import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { UserContext } from '../../User/UserContext';
import Community from '../Community';
import { fetchCommunityContent, addContribution } from '../communityService';

jest.mock('../communityService');
jest.mock('../../Routes/Navbar', () => () => <div data-testid="navbar-mock" />);

const mockUser = { uid: 'testUser123' };
const mockUserContext = { user: mockUser };

const mockCommunityContent = {
  copingStrategies: [
    { id: 1, title: 'Deep Breathing', description: 'Practice deep breathing', authorName: 'User1', likes: 5 }
  ],
  journalPrompts: [
    { id: 1, content: 'What are you grateful for today?', authorName: 'User2', likes: 3 }
  ],
  motivationalQuotes: [
    { id: 1, content: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt', authorName: 'User3', likes: 7 }
  ]
};

describe('Community Component', () => {
  beforeEach(() => {
    fetchCommunityContent.mockResolvedValue(mockCommunityContent);
    addContribution.mockResolvedValue({ id: 2, title: 'New Strategy', description: 'Test description', authorName: 'Test User', likes: 0 });
  });

  it('renders the Community component and loads content', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Community />
        </UserContext.Provider>
      );
    });

    expect(screen.getByText('Mental Health Community')).toBeInTheDocument();
    expect(fetchCommunityContent).toHaveBeenCalled();
    expect(screen.getByText('Deep Breathing')).toBeInTheDocument();
  });

  it('adds a new contribution', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Community />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('Contribute'));
    
    fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'New Strategy' } });
    fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Test description' } });
    fireEvent.click(screen.getByText('Submit Contribution'));

    await waitFor(() => {
      expect(addContribution).toHaveBeenCalledWith(mockUser.uid, 'copingStrategies', {
        title: 'New Strategy',
        description: 'Test description'
      });
      expect(screen.getByText('New Strategy')).toBeInTheDocument();
    });
  });

  it('likes a contribution', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Community />
        </UserContext.Provider>
      );
    });

    const likeButton = screen.getByLabelText('Like Deep Breathing');
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(screen.getByText('Likes: 6')).toBeInTheDocument();
    });
  });

  it('filters content by type', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Community />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('Journal Prompts'));

    expect(screen.getByText('What are you grateful for today?')).toBeInTheDocument();
    expect(screen.queryByText('Deep Breathing')).not.toBeInTheDocument();
  });

  it('searches for content', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Community />
        </UserContext.Provider>
      );
    });

    const searchInput = screen.getByPlaceholder('Search community content...');
    fireEvent.change(searchInput, { target: { value: 'grateful' } });

    await waitFor(() => {
      expect(screen.getByText('What are you grateful for today?')).toBeInTheDocument();
      expect(screen.queryByText('Deep Breathing')).not.toBeInTheDocument();
    });
  });
});