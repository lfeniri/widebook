import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BlogComments from '@/components/BlogComments';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
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

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });
  if (!blog) return notFound();

  return (
    <article className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <div className="text-gray-500 mb-4 flex gap-4 text-sm">
        <span>Catégorie : {blog.category?.name}</span>
        <span>Auteur : {blog.author?.email}</span>
        <span>Publié le {new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      {blog.image && <img src={blog.image} alt="" className="rounded-lg mb-6 w-full max-h-96 object-cover" />}
      <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: blog.content }} />
      <BlogComments blogId={blog.id} comments={blog.comments} />
    </article>
  );
}
