// API route for updating only the content of a blog (GrapesJS)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  const { content } = await req.json();
  if (!id || !content) {
    return NextResponse.json({ error: 'Missing id or content' }, { status: 400 });
  }
  try {
    // Stocke le JSON tel que reçu de GrapesJS (doit être un objet { html, css })
    const updated = await prisma.blog.update({
      where: { id },
      data: { content: content },
    });
    
    // Récupérer le slug pour revalider la page spécifique
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: { slug: true }
    });
    
    // Revalider la page d'accueil et la page du blog
    try {
      if (blog && blog.slug) {
        revalidatePath(`/client/blog/${blog.slug}`);
        revalidatePath('/'); // Revalider aussi la page d'accueil qui pourrait afficher un extrait du contenu
        console.log(`Page du blog ${blog.slug} et page d'accueil revalidées après mise à jour du contenu`);
      }
    } catch (revalidateError) {
      console.error('Erreur lors de la revalidation:', revalidateError);
      // Ne pas bloquer la réponse en cas d'erreur de revalidation
    }
    
    return NextResponse.json(updated);
  } catch (e) {
    console.log('Error updating blog content:', e);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
