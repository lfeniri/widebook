import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/utils';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, categoryId, seoTitle, seoDesc, content } = body;

    if (!title || !slug || !categoryId) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        slug,
        categoryId,
        seoTitle,
        seoDesc,
      },
    });
    
    return NextResponse.json(blog);
  } catch (err) {
    console.error("Erreur lors de la mise à jour du blog:", err);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { category: true, author: true }
    });
    if (!blog) {
      return NextResponse.json({ error: 'Blog non trouvé.' }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (err) {
    console.error("Erreur lors de la récupération du blog:", err);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
    }

    await prisma.blog.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Blog supprimé avec succès.' });
  } catch (err) {
    console.error("Erreur lors de la suppression du blog:", err);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
