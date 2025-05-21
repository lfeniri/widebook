// API route for updating only the content of a blog (GrapesJS)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidateBlogRoutes } from '@/lib/revalidateSitemap';

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
    await revalidateBlogRoutes(blog?.slug, 'update', id);
    
    return NextResponse.json(updated);
  } catch (e) {
    console.log('Error updating blog content:', e);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
