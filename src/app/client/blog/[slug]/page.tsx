import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import BlogPageClient from './BlogPageClient';
import { prisma } from '@/lib/prisma';

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  if (!slug) notFound();

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <BlogContent slug={slug} />
    </Suspense>
  );
}

async function BlogContent({ slug }: { slug: string }) {
  const blog = await prisma.blog.findUnique({
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

  if (!blog) notFound();

  return <BlogPageClient blog={JSON.parse(JSON.stringify(blog))} />;
}
