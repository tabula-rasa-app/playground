import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET endpoint - get or select visitor of the day
export async function GET() {
  try {
    const now = new Date();

    // Check if there's a current visitor of the day that hasn't expired
    const currentVisitorOfTheDay = await prisma.visitorOfTheDay.findFirst({
      where: {
        expiresAt: {
          gt: now
        }
      },
      orderBy: {
        selectedAt: 'desc'
      }
    });

    if (currentVisitorOfTheDay) {
      // Return the existing visitor of the day
      return NextResponse.json({
        id: currentVisitorOfTheDay.id,
        visitorId: currentVisitorOfTheDay.visitorId,
        visitorName: currentVisitorOfTheDay.visitorName,
        selectedAt: currentVisitorOfTheDay.selectedAt,
        expiresAt: currentVisitorOfTheDay.expiresAt
      });
    }

    // No valid visitor of the day, select a new random one
    // First, get all visitors
    const allVisitors = await prisma.visitor.findMany();

    if (allVisitors.length === 0) {
      // No visitors yet
      return NextResponse.json({
        message: 'No visitors yet. Be the first!'
      }, { status: 404 });
    }

    // Select a random visitor
    const randomIndex = Math.floor(Math.random() * allVisitors.length);
    const selectedVisitor = allVisitors[randomIndex];

    // Set expiration to 24 hours from now
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Create the new visitor of the day record
    const newVisitorOfTheDay = await prisma.visitorOfTheDay.create({
      data: {
        visitorId: selectedVisitor.id,
        visitorName: selectedVisitor.name,
        expiresAt: expiresAt
      }
    });

    return NextResponse.json({
      id: newVisitorOfTheDay.id,
      visitorId: newVisitorOfTheDay.visitorId,
      visitorName: newVisitorOfTheDay.visitorName,
      selectedAt: newVisitorOfTheDay.selectedAt,
      expiresAt: newVisitorOfTheDay.expiresAt
    });
  } catch (error) {
    console.error('Error fetching/selecting visitor of the day:', error);
    return NextResponse.json(
      { error: 'Failed to get visitor of the day' },
      { status: 500 }
    );
  }
}

// POST endpoint - manually trigger a new selection (optional, for admin use)
export async function POST() {
  try {
    const now = new Date();

    // Get all visitors
    const allVisitors = await prisma.visitor.findMany();

    if (allVisitors.length === 0) {
      return NextResponse.json({
        message: 'No visitors to select from'
      }, { status: 404 });
    }

    // Select a random visitor
    const randomIndex = Math.floor(Math.random() * allVisitors.length);
    const selectedVisitor = allVisitors[randomIndex];

    // Set expiration to 24 hours from now
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Create the new visitor of the day record
    const newVisitorOfTheDay = await prisma.visitorOfTheDay.create({
      data: {
        visitorId: selectedVisitor.id,
        visitorName: selectedVisitor.name,
        expiresAt: expiresAt
      }
    });

    return NextResponse.json({
      id: newVisitorOfTheDay.id,
      visitorId: newVisitorOfTheDay.visitorId,
      visitorName: newVisitorOfTheDay.visitorName,
      selectedAt: newVisitorOfTheDay.selectedAt,
      expiresAt: newVisitorOfTheDay.expiresAt
    });
  } catch (error) {
    console.error('Error creating new visitor of the day:', error);
    return NextResponse.json(
      { error: 'Failed to create new visitor of the day' },
      { status: 500 }
    );
  }
}
