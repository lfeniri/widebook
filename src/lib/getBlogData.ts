import { prisma } from './prisma';

export async function getBlogDataBySlug(slug: string) {
  return await prisma.blog.findUnique({
    where: { slug },
    include: { category: true, author: true, comments: { include: { author: true } } },
  });
}

export async function getBlogMetadataBySlug(slug: string) {
  return await prisma.blog.findUnique({
    where: { slug },
    select: { title: true }
  });
}
