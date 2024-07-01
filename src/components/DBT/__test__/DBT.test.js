import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { UserContext } from '../../User/UserContext';
import DBT from '../DBT';
import { fetchUserDBTData, updateUserDBTData } from '../dbtService';

jest.mock('../dbtService');
jest.mock('../../Routes/Navbar', () => () => <div data-testid="navbar-mock" />);

const mockUser = { uid: 'testUser123' };
const mockUserContext = { user: mockUser };

const mockDBTData = {
  completedSkills: {
    'Mindfulness': ['Observe', 'Describe'],
    'Distress Tolerance': ['STOP skill']
  },
  completedExercises: [1, 2],
  diaryEntries: [
    { date: '2023-06-29', emotions: 'Calm', urges: 'None', skillsUsed: 'Mindful breathing', selfHarmUrges: 0, suicidalIdeation: 0 }
  ]
};

describe('DBT Component', () => {
  beforeEach(() => {
    fetchUserDBTData.mockResolvedValue(mockDBTData);
    updateUserDBTData.mockResolvedValue();
  });

  it('renders the DBT component and loads user data', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <DBT />
        </UserContext.Provider>
      );
    });

    expect(screen.getByText('Dialectical Behavior Therapy (DBT)')).toBeInTheDocument();
    expect(fetchUserDBTData).toHaveBeenCalledWith(mockUser.uid);
    expect(screen.getByText('Observe')).toBeInTheDocument();
  });

  it('adds a diary card entry', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <DBT />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('Diary Card'));
    
    fireEvent.change(screen.getByLabelText('Emotions:'), { target: { value: 'Happy' } });
    fireEvent.change(screen.getByLabelText('Urges:'), { target: { value: 'None' } });
    fireEvent.change(screen.getByLabelText('Skills Used:'), { target: { value: 'Mindfulness' } });
    fireEvent.change(screen.getByLabelText('Self-Harm Urges (0-5):'), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText('Suicidal Ideation (0-5):'), { target: { value: '0' } });
    fireEvent.click(screen.getByText('Submit Entry'));

    await waitFor(() => {
      expect(updateUserDBTData).toHaveBeenCalled();
    });
  });

  it('completes a DBT skill', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <DBT />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('Skills'));
    fireEvent.click(screen.getByText('Distress Tolerance'));
    const checkbox = screen.getByLabelText('Pros and cons');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(updateUserDBTData).toHaveBeenCalled();
      expect(checkbox).toBeChecked();
    });
  });

  it('completes a DBT exercise', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <DBT />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('Exercises'));
    fireEvent.click(screen.getByText('Start Exercise'));
    fireEvent.click(screen.getByText('Mark as Complete'));

    await waitFor(() => {
      expect(updateUserDBTData).toHaveBeenCalled();
      expect(screen.getByText('Exercise completed!')).toBeInTheDocument();
    });
  });

  it('displays DBT progress', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <DBT />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('Progress'));

    expect(screen.getByText('Your DBT Progress')).toBeInTheDocument();
    expect(screen.getByText('Total Skills Completed: 3')).toBeInTheDocument();
  });
});