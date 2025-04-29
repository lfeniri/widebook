'use server';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function getBlogBySlug() {
  const headersList = headers();
  const slug = headersList.get('x-slug');
  
  if (!slug) return null;

  return await prisma.blog.findUnique({
    where: { slug },
    include: { 
      category: true, 
      author: true, 
      comments: { 
        include: { 
          author: true 
        } 
      } 
    },
  });
}

export async function getBlogMetadataBySlug() {
  const headersList = headers();
  const slug = headersList.get('x-slug');
  
  if (!slug) return null;

  return await prisma.blog.findUnique({
    where: { slug },
    select: { title: true }
  });
}
