import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Invite from './index'; // Adjust the import path as necessary
import { useInviteeRequestMutation, useMasterApiQuery } from '../../services/invite';
import { toast } from 'react-toastify';

// Mock the services
jest.mock('../../services/invite');

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Invite Component', () => {
  const mockMasterApiData = {
    data: {
      user: [
        { id: '1', fullName: 'John Doe' },
        { id: '2', fullName: 'Jane Smith' },
      ],
      venue: [
        { id: '1', name: 'Venue A' },
        { id: '2', name: 'Venue B' },
      ],
      event: [
        { id: '1', name: 'Event X' },
        { id: '2', name: 'Event Y' },
      ],
    },
  };

  const mockInviteeRequestMutation = jest.fn().mockResolvedValue({ data: { status: true } });

  beforeEach(() => {
    (useMasterApiQuery as jest.Mock).mockReturnValue({ data: mockMasterApiData });
    (useInviteeRequestMutation as jest.Mock).mockReturnValue([mockInviteeRequestMutation, { isLoading: false }]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Invite component with form fields', () => {
    render(<Invite />);

    // Check if form fields are rendered
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Venue')).toBeInTheDocument();
    expect(screen.getByLabelText('Event')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /invite/i })).toBeInTheDocument();
  });

  it('displays options in dropdowns based on API data', () => {
    render(<Invite />);

    // Check if dropdown options are populated correctly
    fireEvent.mouseDown(screen.getByLabelText('Name'));
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByLabelText('Venue'));
    expect(screen.getByText('Venue A')).toBeInTheDocument();
    expect(screen.getByText('Venue B')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByLabelText('Event'));
    expect(screen.getByText('Event X')).toBeInTheDocument();
    expect(screen.getByText('Event Y')).toBeInTheDocument();
  });

  it('submits the form with correct payload', async () => {
    render(<Invite />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Venue'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Event'), { target: { value: '2' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /invite/i }));

    await waitFor(() => {
      expect(mockInviteeRequestMutation).toHaveBeenCalledWith({
        userId: '2',
        venueId: '2',
        eventId: '2',
        url: `${window.location.href}invite_approval`,
      });
    });
    screen.debug()

    expect(toast.success).toHaveBeenCalledWith('Invitation sent successfully.');
  });

  it('handles API error correctly', async () => {
    mockInviteeRequestMutation.mockRejectedValueOnce(new Error('API Error'));

    render(<Invite />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Venue'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Event'), { target: { value: '1' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /invite/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to submit.');
    });
  });

  it('shows loader when mutation is in progress', async () => {
    (useInviteeRequestMutation as jest.Mock).mockReturnValue([mockInviteeRequestMutation, { isLoading: true }]);

    render(<Invite />);

    // Check if the loader is displayed
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
