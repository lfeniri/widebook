import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/utils';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
    }

    // Récupération du formData au lieu de JSON
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const categoryId = formData.get('categoryId') as string;
    const seoTitle = formData.get('seoTitle') as string;
    const seoDesc = formData.get('seoDesc') as string;
    const contentConfigStr = formData.get('contentConfig') as string;
    const contentConfig = contentConfigStr ? JSON.parse(contentConfigStr) : undefined;
    const imageFile = formData.get('image') as Blob | null;

    if (!title || !slug || !categoryId) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    // TODO: Gérer l'upload de l'image si nécessaire
    const image = imageFile ? 'path/to/uploaded/image' : undefined;

    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        title,
        contentConfig,
        slug,
        image,
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
    const { id } = params;
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
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
    }
    const { id } = params;
    await prisma.blog.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Blog supprimé avec succès.' });
  } catch (err) {
    console.error("Erreur lors de la suppression du blog:", err);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
