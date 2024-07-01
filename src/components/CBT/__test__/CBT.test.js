import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { UserContext } from '../../User/UserContext';
import CBT from '../CBT';
import { fetchUserCBTData, updateUserCBTData } from '../cbtService';

jest.mock('../cbtService');
jest.mock('../../Routes/Navbar', () => () => <div data-testid="navbar-mock" />);

const mockUser = { uid: 'testUser123' };
const mockUserContext = { user: mockUser };

const mockCBTData = {
  thoughtRecords: [
    { id: 1, situation: 'Test situation', thoughts: 'Test thoughts', emotions: 'Test emotions' }
  ],
  distortionExamples: [
    { id: 1, distortion: 'All-or-Nothing Thinking', example: 'Test example' }
  ],
  beliefChallenges: [
    { id: 1, belief: 'Test belief', evidence: 'Test evidence', alternativeView: 'Test alternative view' }
  ],
  exerciseEntries: [
    { id: 1, exercise: 'Mindful Breathing', notes: 'Test notes' }
  ],
  moodEntries: [
    { date: '2023-06-29', score: 7 }
  ]
};

describe('CBT Component', () => {
  beforeEach(() => {
    fetchUserCBTData.mockResolvedValue(mockCBTData);
    updateUserCBTData.mockResolvedValue();
  });

  it('renders the CBT component and loads user data', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <CBT />
        </UserContext.Provider>
      );
    });

    expect(screen.getByText('Cognitive Behavioral Therapy (CBT)')).toBeInTheDocument();
    expect(fetchUserCBTData).toHaveBeenCalledWith(mockUser.uid);
    expect(screen.getByText('Test situation')).toBeInTheDocument();
  });

  it('adds a new thought record', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <CBT />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('Thought Record'));

    fireEvent.change(screen.getByLabelText('Situation:'), { target: { value: 'New situation' } });
    fireEvent.change(screen.getByLabelText('Thoughts:'), { target: { value: 'New thoughts' } });
    fireEvent.change(screen.getByLabelText('Emotions:'), { target: { value: 'New emotions' } });
    fireEvent.click(screen.getByText('Save Thought Record'));

    await waitFor(() => {
      expect(updateUserCBTData).toHaveBeenCalled();
      expect(screen.getByText('New situation')).toBeInTheDocument();
    });
  });

  it('adds a cognitive distortion example', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <CBT />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('Cognitive Distortions'));
    
    fireEvent.change(screen.getByLabelText('Select a Distortion:'), { target: { value: 'Catastrophizing' } });
    fireEvent.change(screen.getByLabelText('Example:'), { target: { value: 'Assuming the worst will happen' } });
    fireEvent.click(screen.getByText('Save Example'));

    await waitFor(() => {
      expect(updateUserCBTData).toHaveBeenCalled();
      expect(screen.getByText('Assuming the worst will happen')).toBeInTheDocument();
    });
  });

  it('completes a CBT exercise', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <CBT />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('CBT Exercises'));
    fireEvent.click(screen.getByText('Start Exercise'));
    fireEvent.click(screen.getByText('Mark as Complete'));

    await waitFor(() => {
      expect(updateUserCBTData).toHaveBeenCalled();
      expect(screen.getByText('Exercise completed!')).toBeInTheDocument();
    });
  });

  it('displays CBT progress', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={mockUserContext}>
          <CBT />
        </UserContext.Provider>
      );
    });

    fireEvent.click(screen.getByText('Progress'));

    expect(screen.getByText('Your CBT Progress')).toBeInTheDocument();
    expect(screen.getByText('Total Thought Records: 1')).toBeInTheDocument();
  });
});