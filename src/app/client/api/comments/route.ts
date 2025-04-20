import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/utils';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const blogId = searchParams.get('blogId');
  if (!blogId) {
    return NextResponse.json({ error: 'blogId requis' }, { status: 400 });
  }
  const comments = await prisma.comment.findMany({
    where: { blogId },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(comments);
}

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }
  const body = await request.json();
  const { content, blogId } = body;
  if (!content || !blogId) {
    return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
  }
  const comment = await prisma.comment.create({
    data: { content, blogId, authorId: user.id },
  });
  return NextResponse.json(comment);
}
