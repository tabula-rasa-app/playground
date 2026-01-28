import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import VisitorOfTheDay from '../VisitorOfTheDay';

// Mock fetch
global.fetch = jest.fn();

describe('VisitorOfTheDay Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render loading state initially', () => {
    fetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<VisitorOfTheDay />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display visitor of the day when available', async () => {
    const mockVisitorData = {
      id: 1,
      visitorId: 5,
      visitorName: 'John Doe',
      selectedAt: '2024-01-15T10:00:00Z',
      expiresAt: '2024-01-16T10:00:00Z',
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockVisitorData,
    });

    render(<VisitorOfTheDay />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('Featured Visitor')).toBeInTheDocument();
    expect(screen.getByText('22h 0m remaining')).toBeInTheDocument();
  });

  it('should display message when no visitor of the day exists', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'No visitors yet' }),
    });

    render(<VisitorOfTheDay />);

    await waitFor(() => {
      expect(screen.getByText('No visitor of the day yet!')).toBeInTheDocument();
    });

    expect(screen.getByText('Be the first to register and get featured!')).toBeInTheDocument();
  });

  it('should show register form when button is clicked', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'No visitors yet' }),
    });

    render(<VisitorOfTheDay />);

    await waitFor(() => {
      expect(screen.getByText('Register as Visitor')).toBeInTheDocument();
    });

    const registerButton = screen.getByText('Register as Visitor');
    fireEvent.click(registerButton);

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should handle visitor registration successfully', async () => {
    // Mock initial fetch (no visitor)
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'No visitors yet' }),
    });

    render(<VisitorOfTheDay />);

    await waitFor(() => {
      expect(screen.getByText('Register as Visitor')).toBeInTheDocument();
    });

    // Click register button
    fireEvent.click(screen.getByText('Register as Visitor'));

    // Enter name
    const input = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(input, { target: { value: 'Jane Smith' } });

    // Mock registration response
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        id: 1,
        name: 'Jane Smith',
        visitedAt: '2024-01-15T12:00:00Z',
      }),
    });

    // Mock refresh fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        id: 1,
        visitorId: 1,
        visitorName: 'Jane Smith',
        selectedAt: '2024-01-15T12:00:00Z',
        expiresAt: '2024-01-16T12:00:00Z',
      }),
    });

    // Submit form
    const registerSubmitButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(registerSubmitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/visitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Jane Smith' }),
      });
    });
  });

  it('should show error when registering with empty name', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'No visitors yet' }),
    });

    render(<VisitorOfTheDay />);

    await waitFor(() => {
      expect(screen.getByText('Register as Visitor')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Register as Visitor'));

    const registerSubmitButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(registerSubmitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter your name')).toBeInTheDocument();
    });
  });

  it('should handle registration API errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'No visitors yet' }),
    });

    render(<VisitorOfTheDay />);

    await waitFor(() => {
      expect(screen.getByText('Register as Visitor')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Register as Visitor'));

    const input = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(input, { target: { value: 'Test User' } });

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' }),
    });

    const registerSubmitButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(registerSubmitButton);

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });

  it('should cancel registration form', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'No visitors yet' }),
    });

    render(<VisitorOfTheDay />);

    await waitFor(() => {
      expect(screen.getByText('Register as Visitor')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Register as Visitor'));

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByPlaceholderText('Enter your name')).not.toBeInTheDocument();
    expect(screen.getByText('Register as Visitor')).toBeInTheDocument();
  });

  it('should update time remaining correctly', async () => {
    const mockVisitorData = {
      id: 1,
      visitorId: 5,
      visitorName: 'John Doe',
      selectedAt: '2024-01-15T10:00:00Z',
      expiresAt: '2024-01-16T10:00:00Z',
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockVisitorData,
    });

    render(<VisitorOfTheDay />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Initially should show 22h 0m remaining
    expect(screen.getByText('22h 0m remaining')).toBeInTheDocument();
  });

  it('should handle fetch errors gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<VisitorOfTheDay />);

    await waitFor(() => {
      expect(screen.getByText('Register as Visitor')).toBeInTheDocument();
    });
  });
});
