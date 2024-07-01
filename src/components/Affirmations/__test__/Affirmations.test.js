import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { UserContext } from '../../User/UserContext';
import Affirmations from '../Affirmations';
import { fetchUserAffirmations, updateUserAffirmations } from '../affirmationService';

jest.mock('../affirmationService');
jest.mock('../../Routes/Navbar', () => () => <div data-testid="navbar-mock" />);

const mockUser = { uid: 'testUser123' };
const mockUserContext = { user: mockUser };

const mockAffirmations = {
  dailyAffirmation: { text: "I am capable of achieving great things." },
  customAffirmations: [
    { id: 1, text: "I am worthy of love and respect.", category: "Self-esteem" }
  ],
  reminders: [
    { time: "09:00", days: ["Mon", "Wed", "Fri"] }
  ]
};

describe('Affirmations Component', () => {
  beforeEach(() => {
    fetchUserAffirmations.mockResolvedValue(mockAffirmations);
    updateUserAffirmations.mockResolvedValue();
  });

  it('renders the Affirmations component', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Affirmations />
        </UserContext.Provider>
      );
    });

    expect(screen.getByText('Daily Affirmations')).toBeInTheDocument();
    expect(screen.getByText('Your Daily Affirmation')).toBeInTheDocument();
    expect(screen.getByText('I am capable of achieving great things.')).toBeInTheDocument();
  });

  it('adds a new affirmation', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Affirmations />
        </UserContext.Provider>
      );
    });

    const newAffirmation = "I am confident and capable.";
    const newCategory = "Confidence";

    fireEvent.change(screen.getByPlaceholder('Enter your affirmation'), { target: { value: newAffirmation } });
    fireEvent.change(screen.getByPlaceholder('Category'), { target: { value: newCategory } });
    fireEvent.click(screen.getByText('Add Affirmation'));

    await waitFor(() => {
      expect(updateUserAffirmations).toHaveBeenCalled();
      expect(screen.getByText(newAffirmation)).toBeInTheDocument();
    });
  });

  it('adds a new reminder', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Affirmations />
        </UserContext.Provider>
      );
    });

    fireEvent.change(screen.getByLabelText('Time:'), { target: { value: '10:00' } });
    fireEvent.click(screen.getByText('Mon'));
    fireEvent.click(screen.getByText('Wed'));
    fireEvent.click(screen.getByText('Add Reminder'));

    await waitFor(() => {
      expect(updateUserAffirmations).toHaveBeenCalled();
      expect(screen.getByText('10:00')).toBeInTheDocument();
      expect(screen.getByText('Mon, Wed')).toBeInTheDocument();
    });
  });

  it('deletes an affirmation', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Affirmations />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(updateUserAffirmations).toHaveBeenCalled();
      expect(screen.queryByText('I am worthy of love and respect.')).not.toBeInTheDocument();
    });
  });

  it('filters affirmations by category', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Affirmations />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('Self-esteem'));

    expect(screen.getByText('I am worthy of love and respect.')).toBeInTheDocument();
    expect(screen.queryByText('I am confident and capable.')).not.toBeInTheDocument();
  });

  it('updates daily affirmation', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <Affirmations />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('New Daily Affirmation'));

    await waitFor(() => {
      expect(updateUserAffirmations).toHaveBeenCalled();
      expect(screen.getByText(/Your new daily affirmation/)).toBeInTheDocument();
    });
  });
});