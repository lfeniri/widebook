import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');
  const where = categoryId ? { categoryId } : {};
  const blogs = await prisma.blog.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(blogs);
}
