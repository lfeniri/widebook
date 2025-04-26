import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/utils';

// GET /api/blogs/[blogId]/chat?blogId=xxx
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const blogId = searchParams.get('blogId');
  if (!blogId) {
    return NextResponse.json({ error: 'blogId requis' }, { status: 400 });
  }
  const messages = await prisma.blogChatMessage.findMany({
    where: { blogId },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(messages);
}
