import { QueryMode } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const search = searchParams.get('search')?.trim() || '';

  const where = search
    ? {
        OR: [
          { title: { contains: search } },
        ],
      }
    : {};

  const total = await prisma.blog.count({ where });
  const pageCount = Math.ceil(total / pageSize);
  const blogs = await prisma.blog.findMany({
    where,
    include: { category: true, author: true, comments: true },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  return NextResponse.json({ blogs, pageCount, total });
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
    }
    const body = await request.json();
    const { title, contentConfig, slug, image, categoryId, seoTitle, seoDesc } = body;
    if (!title || !contentConfig || !slug || !categoryId) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }
    const blog = await prisma.blog.create({
      data: { title, contentConfig, slug, image, categoryId, authorId: user.id, seoTitle, seoDesc },
    });
    return NextResponse.json(blog);
  } catch (err) {
    console.error("Erreur lors de la création du blog:", err);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}


