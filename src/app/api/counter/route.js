import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const COUNTER_NAME = 'global-clicks';

// GET endpoint - retrieve current counter value
export async function GET() {
  try {
    // Get or create the counter
    let counter = await prisma.counter.findUnique({
      where: { name: COUNTER_NAME }
    });

    if (!counter) {
      counter = await prisma.counter.create({
        data: {
          name: COUNTER_NAME,
          value: 0
        }
      });
    }

    return NextResponse.json({
      value: counter.value,
      updatedAt: counter.updatedAt
    });
  } catch (error) {
    console.error('Error fetching counter:', error);
    return NextResponse.json(
      { error: 'Failed to fetch counter' },
      { status: 500 }
    );
  }
}

// POST endpoint - increment counter
export async function POST() {
  try {
    // Upsert: create if doesn't exist, increment if it does
    const counter = await prisma.counter.upsert({
      where: { name: COUNTER_NAME },
      update: {
        value: {
          increment: 1
        }
      },
      create: {
        name: COUNTER_NAME,
        value: 1
      }
    });

    return NextResponse.json({
      value: counter.value,
      updatedAt: counter.updatedAt
    });
  } catch (error) {
    console.error('Error incrementing counter:', error);
    return NextResponse.json(
      { error: 'Failed to increment counter' },
      { status: 500 }
    );
  }
}
