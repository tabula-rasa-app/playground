/**
 * @jest-environment node
 */

import { GET, POST } from '../route';
import { prisma } from '@/lib/prisma';

// Mock Prisma client
jest.mock('@/lib/prisma', () => ({
  prisma: {
    visitor: {
      create: jest.fn(),
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

describe('/api/visitor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST endpoint', () => {
    it('should create a new visitor with valid name', async () => {
      const mockVisitor = {
        id: 1,
        name: 'John Doe',
        visitedAt: new Date('2024-01-01'),
      };

      prisma.visitor.create.mockResolvedValue(mockVisitor);

      const mockRequest = {
        json: async () => ({ name: 'John Doe' }),
      };

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(prisma.visitor.create).toHaveBeenCalledWith({
        data: { name: 'John Doe' },
      });
      expect(data).toEqual({
        id: 1,
        name: 'John Doe',
        visitedAt: mockVisitor.visitedAt,
      });
    });

    it('should trim whitespace from visitor name', async () => {
      const mockVisitor = {
        id: 2,
        name: 'Jane Smith',
        visitedAt: new Date('2024-01-01'),
      };

      prisma.visitor.create.mockResolvedValue(mockVisitor);

      const mockRequest = {
        json: async () => ({ name: '  Jane Smith  ' }),
      };

      const response = await POST(mockRequest);

      expect(prisma.visitor.create).toHaveBeenCalledWith({
        data: { name: 'Jane Smith' },
      });
    });

    it('should return 400 for empty name', async () => {
      const mockRequest = {
        json: async () => ({ name: '' }),
      };

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Visitor name is required');
      expect(prisma.visitor.create).not.toHaveBeenCalled();
    });

    it('should return 400 for missing name', async () => {
      const mockRequest = {
        json: async () => ({}),
      };

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Visitor name is required');
      expect(prisma.visitor.create).not.toHaveBeenCalled();
    });

    it('should return 400 for whitespace-only name', async () => {
      const mockRequest = {
        json: async () => ({ name: '   ' }),
      };

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Visitor name is required');
    });

    it('should handle database errors', async () => {
      prisma.visitor.create.mockRejectedValue(new Error('Database error'));

      const mockRequest = {
        json: async () => ({ name: 'Test User' }),
      };

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to register visitor');
    });
  });

  describe('GET endpoint', () => {
    it('should return list of visitors', async () => {
      const mockVisitors = [
        {
          id: 1,
          name: 'John Doe',
          visitedAt: new Date('2024-01-01'),
        },
        {
          id: 2,
          name: 'Jane Smith',
          visitedAt: new Date('2024-01-02'),
        },
      ];

      prisma.visitor.findMany.mockResolvedValue(mockVisitors);

      const response = await GET();
      const data = await response.json();

      expect(prisma.visitor.findMany).toHaveBeenCalledWith({
        orderBy: { visitedAt: 'desc' },
        take: 100,
      });
      expect(data.visitors).toEqual(mockVisitors);
    });

    it('should handle database errors', async () => {
      prisma.visitor.findMany.mockRejectedValue(new Error('Database error'));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch visitors');
    });
  });
});
