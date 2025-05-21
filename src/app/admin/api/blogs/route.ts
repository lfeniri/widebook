import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

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
    /*const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
    }*/
    const body = await request.json();
    const { title, content, slug, image, categoryId, seoTitle, seoDesc } = body;
    if (!title || !content || !slug || !categoryId) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }
    // Prisma Blog model now expects content as Json
    const blog = await prisma.blog.create({
      data: {
        title,
        content: content,
        slug,
        image,
        categoryId,
        authorId: user.id,
        seoTitle,
        seoDesc,
      },
    });    // Revalider le sitemap pour inclure le nouveau blog
    try {
      revalidatePath('/sitemap.xml');
      console.log('Sitemap revalidé après création de blog');
    } catch (revalidateError) {
      console.error('Erreur lors de la revalidation du sitemap:', revalidateError);
      // Ne pas bloquer la réponse en cas d'erreur de revalidation
    }
    
    return NextResponse.json(blog);
  } catch (err) {
    console.error("Erreur lors de la création du blog:", err);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}


