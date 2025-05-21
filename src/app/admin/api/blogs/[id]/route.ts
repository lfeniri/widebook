import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    /*const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
    }*/

    const body = await request.json();
    const { title, slug, categoryId, seoTitle, seoDesc, content } = body;

    if (!title || !slug || !categoryId) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        content: content,
        slug,
        categoryId,
        seoTitle,
        seoDesc,
      },    });    // Revalider le sitemap, la page d'accueil et la page du blog lorsqu'un blog est mis à jour
    try {
      revalidatePath('/sitemap.xml');
      revalidatePath(`/client/blog/${slug}`);
      revalidatePath('/'); // Revalider la page d'accueil qui affiche la liste des blogs
      console.log(`Sitemap, page d'accueil et page du blog ${slug} revalidés après mise à jour du blog ID: ${id}`);
    } catch (revalidateError) {
      console.error('Erreur lors de la revalidation:', revalidateError);
      // Ne pas bloquer la réponse en cas d'erreur de revalidation
    }

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
) {  try {
    const { id } = await params;
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
    }    
    // Récupérer le blog avant de le supprimer pour obtenir le slug
    const blogToDelete = await prisma.blog.findUnique({
      where: { id },
      select: { slug: true }
    });
    
    // Supprimer le blog
    await prisma.blog.delete({
      where: { id },
    });    // Revalider le sitemap et la page d'accueil après la suppression d'un blog
    try {
      if (blogToDelete && blogToDelete.slug) {
        revalidatePath('/sitemap.xml');
        revalidatePath(`/client/blog/${blogToDelete.slug}`);
        revalidatePath('/'); // Revalider la page d'accueil
        console.log(`Sitemap, page d'accueil et page du blog ${blogToDelete.slug} revalidés après suppression du blog ID: ${id}`);
      } else {
        revalidatePath('/sitemap.xml');
        revalidatePath('/'); // Revalider la page d'accueil même si le blog n'existe pas
        console.log(`Sitemap et page d'accueil revalidés après suppression du blog ID: ${id}`);
      }
    } catch (revalidateError) {
      console.error('Erreur lors de la revalidation:', revalidateError);
      // Ne pas bloquer la réponse en cas d'erreur de revalidation
    }
    
    return NextResponse.json({ message: 'Blog supprimé avec succès.' });
  } catch (err) {
    console.error("Erreur lors de la suppression du blog:", err);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
