import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUserFromRequest } from '@/lib/utils';


export async function GET() {
  // Récupère tous les blogs avec leur catégorie et auteur
  const blogs = await prisma.blog.findMany({
    include: {
      category: true,
      author: true,
      comments: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }
  const body = await request.json();
  const { title, content, slug, image, categoryId, seoTitle, seoDesc } = body;
  if (!title || !content || !slug || !categoryId) {
    return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
  }
  const blog = await prisma.blog.create({
    data: { title, content, slug, image, categoryId, authorId: user.id, seoTitle, seoDesc },
  });
  return NextResponse.json(blog);
}

export async function PUT(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID manquant.' }, { status: 400 });
  }
  const body = await request.json();
  const { title, content, slug, image, categoryId, seoTitle, seoDesc } = body;
  if (!title || !content || !slug || !categoryId) {
    return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
  }
  const updated = await prisma.blog.update({
    where: { id },
    data: { title, content, slug, image, categoryId, seoTitle, seoDesc },
  });
  return NextResponse.json(updated);
}
