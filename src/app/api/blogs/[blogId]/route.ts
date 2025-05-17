import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/blogs/[blogId]
 * Récupère un blog public par son ID
 */
export async function GET(
  request: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { blogId } = params;

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: true
          }
        }
      },
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
