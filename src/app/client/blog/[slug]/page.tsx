import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BlogPageClient from './BlogPageClient';

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: { category: true, author: true, comments: { include: { author: true } } },
  });
  if (!blog) return notFound();

  // Pass a snapshot of the blog data to the client component
  const blogData = JSON.parse(JSON.stringify(blog));

  return <BlogPageClient blog={blogData} />;
}
