import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'ID manquant.' }, { status: 400 });
  }
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: { category: true, author: true, comments: true },
  });
  if (!blog) {
    return NextResponse.json({ error: 'Blog introuvable.' }, { status: 404 });
  }
  return NextResponse.json(blog);
}
