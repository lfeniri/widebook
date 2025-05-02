// API route for updating only the contentConfig of a blog
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { contentConfig } = await req.json();
  if (!id || !contentConfig) {
    return NextResponse.json({ error: 'Missing id or contentConfig' }, { status: 400 });
  }
  try {
    const updated = await prisma.blog.update({
      where: { id },
      data: { contentConfig },
    });
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
