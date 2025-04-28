import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug },
    select: { title: true, seoTitle: true, seoDesc: true, image: true },
  });
  if (!blog) return {};
  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDesc || blog.title,
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDesc || blog.title,
      images: blog.image ? [{ url: blog.image }] : undefined,
    },
  };
}
