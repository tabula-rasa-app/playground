import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST endpoint - register a new visitor
export async function POST(request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Visitor name is required' },
        { status: 400 }
      );
    }

    // Trim and limit name length
    const trimmedName = name.trim().slice(0, 50);

    const visitor = await prisma.visitor.create({
      data: {
        name: trimmedName
      }
    });

    return NextResponse.json({
      id: visitor.id,
      name: visitor.name,
      visitedAt: visitor.visitedAt
    });
  } catch (error) {
    console.error('Error creating visitor:', error);
    return NextResponse.json(
      { error: 'Failed to register visitor' },
      { status: 500 }
    );
  }
}

// GET endpoint - get all visitors (optional, for debugging)
export async function GET() {
  try {
    const visitors = await prisma.visitor.findMany({
      orderBy: {
        visitedAt: 'desc'
      },
      take: 100
    });

    return NextResponse.json({ visitors });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitors' },
      { status: 500 }
    );
  }
}
