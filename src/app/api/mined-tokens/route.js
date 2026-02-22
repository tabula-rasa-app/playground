import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const MINER_KEY = 'ai-miner';

export async function GET() {
  try {
    let record = await prisma.minedTokens.findUnique({
      where: { name: MINER_KEY },
    });

    if (!record) {
      record = await prisma.minedTokens.create({
        data: { name: MINER_KEY, total: 0 },
      });
    }

    return NextResponse.json({ total: record.total, updatedAt: record.updatedAt });
  } catch (error) {
    console.error('Error fetching mined tokens:', error);
    return NextResponse.json({ error: 'Failed to fetch mined tokens' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { amount } = await request.json();

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const record = await prisma.minedTokens.upsert({
      where: { name: MINER_KEY },
      update: { total: { increment: Math.floor(amount) } },
      create: { name: MINER_KEY, total: Math.floor(amount) },
    });

    return NextResponse.json({ total: record.total });
  } catch (error) {
    console.error('Error updating mined tokens:', error);
    return NextResponse.json({ error: 'Failed to update mined tokens' }, { status: 500 });
  }
}
