import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BlogComments from '@/components/BlogComments';
import { GridRenderer } from 'visual-blog-builder-lib/components/GridRenderer';
import { convertContentConfigToGrid } from '@/lib/utils';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: { category: true, author: true, comments: { include: { author: true } } },
  });
  if (!blog) return notFound();

  return (
    <article className="max-w-4xl mx-auto py-12 px-4 md:px-12 card animate-fadeInUp">
      <h1 className="text-4xl font-extrabold mb-4 text-primary drop-shadow-sm animate-fadeInUp">{blog.title}</h1>
      <div className="text-gray-500 mb-6 flex flex-wrap gap-6 text-base animate-fadeInUp">
        <span>Catégorie : {blog.category?.name}</span>
        <span>Auteur : {blog.author?.email}</span>
        <span>Publié le {new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      {blog.image && <img src={blog.image} alt="" className="rounded-lg mb-8 w-full max-h-[420px] object-cover animate-fadeIn" />}
      {blog.contentConfig && (
        <GridRenderer grid={convertContentConfigToGrid(blog.contentConfig)} />
      )}
      <BlogComments
        blogId={blog.id}
        comments={(blog.comments ?? []).map(comment => ({
          ...comment,
          author: comment.author
            ? {
                ...comment.author,
                email: comment.author.email ?? '',
                name: typeof comment.author.name === 'string' ? comment.author.name : '',
              }
            : undefined,
        }))}
      />
    </article>
  );
}
