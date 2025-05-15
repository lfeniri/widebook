// API route for updating only the content of a blog (GrapesJS)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  const { content } = await req.json();
  if (!id || !content) {
    return NextResponse.json({ error: 'Missing id or content' }, { status: 400 });
  }
  try {
    // Stocke le JSON tel que reçu de GrapesJS (doit être un objet { html, css })
    const updated = await prisma.blog.update({
      where: { id },
      data: { content: content },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.log('Error updating blog content:', e);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
