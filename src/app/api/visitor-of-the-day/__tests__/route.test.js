/**
 * @jest-environment node
 */

import { GET, POST } from '../route';
import { prisma } from '@/lib/prisma';

// Mock Prisma client
jest.mock('@/lib/prisma', () => ({
  prisma: {
    visitorOfTheDay: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    visitor: {
      findMany: jest.fn(),
    },
  },
}));

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      json: async () => data,
      status: options?.status || 200,
      ok: !options?.status || options.status < 400,
    })),
  },
}));

describe('/api/visitor-of-the-day', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock Date.now() for consistent testing
    jest.spyOn(Date, 'now').mockReturnValue(new Date('2024-01-15T12:00:00Z').getTime());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET endpoint', () => {
    it('should return existing valid visitor of the day', async () => {
      const mockVisitorOfTheDay = {
        id: 1,
        visitorId: 5,
        visitorName: 'John Doe',
        selectedAt: new Date('2024-01-15T10:00:00Z'),
        expiresAt: new Date('2024-01-16T10:00:00Z'),
      };

      prisma.visitorOfTheDay.findFirst.mockResolvedValue(mockVisitorOfTheDay);

      const response = await GET();
      const data = await response.json();

      expect(data).toEqual({
        id: 1,
        visitorId: 5,
        visitorName: 'John Doe',
        selectedAt: mockVisitorOfTheDay.selectedAt,
        expiresAt: mockVisitorOfTheDay.expiresAt,
      });
    });

    it('should select new visitor when none exists', async () => {
      const mockVisitors = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ];

      const mockNewVisitorOfTheDay = {
        id: 1,
        visitorId: 2,
        visitorName: 'Bob',
        selectedAt: new Date('2024-01-15T12:00:00Z'),
        expiresAt: new Date('2024-01-16T12:00:00Z'),
      };

      prisma.visitorOfTheDay.findFirst.mockResolvedValue(null);
      prisma.visitor.findMany.mockResolvedValue(mockVisitors);
      prisma.visitorOfTheDay.create.mockResolvedValue(mockNewVisitorOfTheDay);

      // Mock Math.random to select specific visitor
      jest.spyOn(Math, 'random').mockReturnValue(0.5); // Will select index 1 (Bob)

      const response = await GET();
      const data = await response.json();

      expect(prisma.visitor.findMany).toHaveBeenCalled();
      expect(prisma.visitorOfTheDay.create).toHaveBeenCalledWith({
        data: {
          visitorId: 2,
          visitorName: 'Bob',
          expiresAt: expect.any(Date),
        },
      });
      expect(data.visitorName).toBe('Bob');
    });

    it('should return 404 when no visitors exist', async () => {
      prisma.visitorOfTheDay.findFirst.mockResolvedValue(null);
      prisma.visitor.findMany.mockResolvedValue([]);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.message).toBe('No visitors yet. Be the first!');
    });

    it('should select new visitor when current has expired', async () => {
      // Current visitor expired
      const expiredVisitor = {
        id: 1,
        visitorId: 1,
        visitorName: 'Old Visitor',
        selectedAt: new Date('2024-01-14T10:00:00Z'),
        expiresAt: new Date('2024-01-15T10:00:00Z'), // Expired (before current time)
      };

      const mockVisitors = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];

      const mockNewVisitorOfTheDay = {
        id: 2,
        visitorId: 1,
        visitorName: 'Alice',
        selectedAt: new Date('2024-01-15T12:00:00Z'),
        expiresAt: new Date('2024-01-16T12:00:00Z'),
      };

      prisma.visitorOfTheDay.findFirst.mockResolvedValue(null); // No valid visitor found
      prisma.visitor.findMany.mockResolvedValue(mockVisitors);
      prisma.visitorOfTheDay.create.mockResolvedValue(mockNewVisitorOfTheDay);

      jest.spyOn(Math, 'random').mockReturnValue(0.1); // Select Alice

      const response = await GET();
      const data = await response.json();

      expect(data.visitorName).toBe('Alice');
    });

    it('should handle database errors', async () => {
      prisma.visitorOfTheDay.findFirst.mockRejectedValue(new Error('Database error'));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to get visitor of the day');
    });
  });

  describe('POST endpoint', () => {
    it('should manually create new visitor of the day', async () => {
      const mockVisitors = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];

      const mockNewVisitorOfTheDay = {
        id: 1,
        visitorId: 2,
        visitorName: 'Bob',
        selectedAt: new Date('2024-01-15T12:00:00Z'),
        expiresAt: new Date('2024-01-16T12:00:00Z'),
      };

      prisma.visitor.findMany.mockResolvedValue(mockVisitors);
      prisma.visitorOfTheDay.create.mockResolvedValue(mockNewVisitorOfTheDay);

      jest.spyOn(Math, 'random').mockReturnValue(0.5); // Select Bob

      const response = await POST();
      const data = await response.json();

      expect(data.visitorName).toBe('Bob');
      expect(prisma.visitorOfTheDay.create).toHaveBeenCalled();
    });

    it('should return 404 when no visitors to select', async () => {
      prisma.visitor.findMany.mockResolvedValue([]);

      const response = await POST();
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.message).toBe('No visitors to select from');
    });

    it('should handle database errors', async () => {
      prisma.visitor.findMany.mockRejectedValue(new Error('Database error'));

      const response = await POST();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to create new visitor of the day');
    });
  });
});
