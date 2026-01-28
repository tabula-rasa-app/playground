/**
 * @jest-environment node
 */

import { GET, POST } from '../route';
import { prisma } from '@/lib/prisma';

// Mock Prisma client
jest.mock('@/lib/prisma', () => ({
  prisma: {
    counter: {
      findUnique: jest.fn(),
      create: jest.fn(),
      upsert: jest.fn(),
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

describe('/api/counter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET endpoint', () => {
    it('should return existing counter value', async () => {
      const mockCounter = {
        id: 1,
        name: 'global-clicks',
        value: 42,
        updatedAt: new Date('2024-01-01'),
      };

      prisma.counter.findUnique.mockResolvedValue(mockCounter);

      const response = await GET();
      const data = await response.json();

      expect(prisma.counter.findUnique).toHaveBeenCalledWith({
        where: { name: 'global-clicks' },
      });
      expect(data).toEqual({
        value: 42,
        updatedAt: mockCounter.updatedAt,
      });
    });

    it('should create counter if it does not exist', async () => {
      const newCounter = {
        id: 1,
        name: 'global-clicks',
        value: 0,
        updatedAt: new Date('2024-01-01'),
      };

      prisma.counter.findUnique.mockResolvedValue(null);
      prisma.counter.create.mockResolvedValue(newCounter);

      const response = await GET();
      const data = await response.json();

      expect(prisma.counter.findUnique).toHaveBeenCalled();
      expect(prisma.counter.create).toHaveBeenCalledWith({
        data: {
          name: 'global-clicks',
          value: 0,
        },
      });
      expect(data).toEqual({
        value: 0,
        updatedAt: newCounter.updatedAt,
      });
    });

    it('should handle errors gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();
      prisma.counter.findUnique.mockRejectedValue(new Error('Database error'));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Failed to fetch counter' });

      consoleError.mockRestore();
    });
  });

  describe('POST endpoint', () => {
    it('should increment existing counter', async () => {
      const updatedCounter = {
        id: 1,
        name: 'global-clicks',
        value: 43,
        updatedAt: new Date('2024-01-02'),
      };

      prisma.counter.upsert.mockResolvedValue(updatedCounter);

      const response = await POST();
      const data = await response.json();

      expect(prisma.counter.upsert).toHaveBeenCalledWith({
        where: { name: 'global-clicks' },
        update: {
          value: {
            increment: 1,
          },
        },
        create: {
          name: 'global-clicks',
          value: 1,
        },
      });
      expect(data).toEqual({
        value: 43,
        updatedAt: updatedCounter.updatedAt,
      });
    });

    it('should create counter with value 1 if not exists', async () => {
      const newCounter = {
        id: 1,
        name: 'global-clicks',
        value: 1,
        updatedAt: new Date('2024-01-01'),
      };

      prisma.counter.upsert.mockResolvedValue(newCounter);

      const response = await POST();
      const data = await response.json();

      expect(prisma.counter.upsert).toHaveBeenCalled();
      expect(data).toEqual({
        value: 1,
        updatedAt: newCounter.updatedAt,
      });
    });

    it('should handle multiple increments correctly', async () => {
      const counters = [
        { id: 1, name: 'global-clicks', value: 1, updatedAt: new Date() },
        { id: 1, name: 'global-clicks', value: 2, updatedAt: new Date() },
        { id: 1, name: 'global-clicks', value: 3, updatedAt: new Date() },
      ];

      for (let i = 0; i < 3; i++) {
        prisma.counter.upsert.mockResolvedValueOnce(counters[i]);
        const response = await POST();
        const data = await response.json();
        expect(data.value).toBe(i + 1);
      }

      expect(prisma.counter.upsert).toHaveBeenCalledTimes(3);
    });

    it('should handle errors gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();
      prisma.counter.upsert.mockRejectedValue(new Error('Database error'));

      const response = await POST();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Failed to increment counter' });

      consoleError.mockRestore();
    });
  });

  describe('Integration scenarios', () => {
    it('should handle GET followed by POST', async () => {
      // First GET returns 10
      const initialCounter = {
        id: 1,
        name: 'global-clicks',
        value: 10,
        updatedAt: new Date('2024-01-01'),
      };
      prisma.counter.findUnique.mockResolvedValue(initialCounter);

      const getResponse = await GET();
      const getData = await getResponse.json();
      expect(getData.value).toBe(10);

      // Then POST increments to 11
      const incrementedCounter = {
        id: 1,
        name: 'global-clicks',
        value: 11,
        updatedAt: new Date('2024-01-02'),
      };
      prisma.counter.upsert.mockResolvedValue(incrementedCounter);

      const postResponse = await POST();
      const postData = await postResponse.json();
      expect(postData.value).toBe(11);
    });

    it('should handle POST creating counter, then GET retrieving it', async () => {
      // POST creates counter with value 1
      const newCounter = {
        id: 1,
        name: 'global-clicks',
        value: 1,
        updatedAt: new Date('2024-01-01'),
      };
      prisma.counter.upsert.mockResolvedValue(newCounter);

      const postResponse = await POST();
      const postData = await postResponse.json();
      expect(postData.value).toBe(1);

      // GET retrieves the counter
      prisma.counter.findUnique.mockResolvedValue(newCounter);

      const getResponse = await GET();
      const getData = await getResponse.json();
      expect(getData.value).toBe(1);
    });
  });
});
