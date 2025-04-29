import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({
    where: { id: params.id },
    select: { title: true },
  });

  return {
    title: blog ? `Modifier: ${blog.title}` : 'Éditeur de blog',
  };
}
