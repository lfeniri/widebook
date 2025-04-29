import { cache } from 'react';
import { prisma } from './prisma';

export const getBlogData = cache(async (slug: string) => {
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
    }
  });
});

export const getBlogMetadata = cache(async (slug: string) => {
  return await prisma.blog.findUnique({
    where: { slug },
    select: { title: true }
  });
});
