// API route for updating only the contentConfig of a blog (GrapesJS)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { contentConfig } = await req.json();
  if (!id || typeof contentConfig !== 'string') {
    return NextResponse.json({ error: 'Missing id or contentConfig (string)' }, { status: 400 });
  }
  try {
    // Stocke le JSON stringifié tel que reçu de GrapesJS
    const updated = await prisma.blog.update({
      where: { id },
      data: { contentConfig },
    });
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
