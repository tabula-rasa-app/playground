import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const CHAMPIONSHIPS = [
  'world-cup',
  'champions-league',
  'premier-league',
  'la-liga',
  'serie-a',
  'bundesliga',
  'ligue-1',
  'brasileirao',
  'copa-libertadores',
  'mls',
  'afc-champions',
  'africa-cup',
];

// GET - return all championships with their goal counts
export async function GET() {
  try {
    const records = await prisma.goalCounter.findMany({
      where: { championship: { in: CHAMPIONSHIPS } },
    });

    const map = Object.fromEntries(records.map((r) => [r.championship, r.goals]));
    const result = CHAMPIONSHIPS.map((key) => ({ championship: key, goals: map[key] ?? 0 }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching goals:', error);
    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 });
  }
}

// POST - increment goals for a specific championship
export async function POST(request) {
  try {
    const { championship } = await request.json();

    if (!CHAMPIONSHIPS.includes(championship)) {
      return NextResponse.json({ error: 'Invalid championship' }, { status: 400 });
    }

    const record = await prisma.goalCounter.upsert({
      where: { championship },
      update: { goals: { increment: 1 } },
      create: { championship, goals: 1 },
    });

    return NextResponse.json({ championship: record.championship, goals: record.goals });
  } catch (error) {
    console.error('Error recording goal:', error);
    return NextResponse.json({ error: 'Failed to record goal' }, { status: 500 });
  }
}
