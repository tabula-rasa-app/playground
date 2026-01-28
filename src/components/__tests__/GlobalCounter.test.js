import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GlobalCounter from '../GlobalCounter';

// Mock fetch API
global.fetch = jest.fn();

describe('GlobalCounter', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    fetch.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders the counter component', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: 0 }),
    });

    render(<GlobalCounter />);

    expect(screen.getByText('Global Click Counter')).toBeInTheDocument();
    expect(screen.getByText('Join visitors from around the world!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('fetches and displays initial count on mount', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: 42 }),
    });

    render(<GlobalCounter />);

    // Initially shows loading
    expect(screen.getByText('...')).toBeInTheDocument();

    // Wait for count to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    // Verify fetch was called correctly
    expect(fetch).toHaveBeenCalledWith('/api/counter');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('increments counter when button is clicked', async () => {
    const user = userEvent.setup();

    // Mock initial GET request
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: 10 }),
    });

    render(<GlobalCounter />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    // Mock POST request for increment
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: 11 }),
    });

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    // Should show optimistic update first (11)
    await waitFor(() => {
      expect(screen.getByText('11')).toBeInTheDocument();
    });

    // Verify POST was called
    expect(fetch).toHaveBeenCalledWith('/api/counter', {
      method: 'POST',
    });
  });

  test('handles multiple clicks correctly', async () => {
    const user = userEvent.setup();

    // Mock initial GET
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: 5 }),
    });

    render(<GlobalCounter />);

    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    // First click
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: 6 }),
    });

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('6')).toBeInTheDocument();
    });

    // Second click
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: 7 }),
    });

    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('7')).toBeInTheDocument();
    });

    // Should have called POST twice (plus initial GET)
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  test('reverts count on error when incrementing', async () => {
    const user = userEvent.setup();
    const consoleError = jest.spyOn(console, 'error').mockImplementation();

    // Mock initial GET
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: 20 }),
    });

    render(<GlobalCounter />);

    await waitFor(() => {
      expect(screen.getByText('20')).toBeInTheDocument();
    });

    // Mock failed POST
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    // Should briefly show optimistic update (21), then revert to 20
    await waitFor(() => {
      expect(screen.getByText('20')).toBeInTheDocument();
    });

    consoleError.mockRestore();
  });

  test('displays large numbers with proper formatting', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: 1234567 }),
    });

    render(<GlobalCounter />);

    await waitFor(() => {
      expect(screen.getByText('1,234,567')).toBeInTheDocument();
    });
  });

  test('button is disabled while loading', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: 0 }),
    });

    render(<GlobalCounter />);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
  });

  test('button is enabled after loading completes', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: 0 }),
    });

    render(<GlobalCounter />);

    const button = screen.getByRole('button', { name: /click me/i });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });

  test('handles fetch error on initial load gracefully', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();

    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<GlobalCounter />);

    await waitFor(() => {
      // Should show 0 as fallback
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    consoleError.mockRestore();
  });
});
