import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/blogs
 * Récupère tous les blogs publics
 */
export async function GET(request: Request) {
  try {
    // Récupérer tous les blogs, incluant leur catégorie et auteur, triés par date de création décroissante
    const blogs = await prisma.blog.findMany({
      include: {
        category: true,
        author: {
          select: {
            id: true, 
            name: true,
            email: true,
          }
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
