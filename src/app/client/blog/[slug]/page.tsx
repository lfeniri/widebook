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
    include: { category: true, author: true, comments: { include: { author: true } } },
  });
  if (!blog) return notFound();

  return (
    <article className="max-w-7xl mx-auto py-12 px-4 md:px-12 bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{blog.title}</h1>
      <div className="text-gray-500 mb-6 flex flex-wrap gap-6 text-base">
        <span>Catégorie : {blog.category?.name}</span>
        <span>Auteur : {blog.author?.email}</span>
        <span>Publié le {new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      {blog.image && <img src={blog.image} alt="" className="rounded-lg mb-8 w-full max-h-[480px] object-cover" />}
      <div className="prose prose-lg max-w-none mb-10" dangerouslySetInnerHTML={{ __html: blog.content }} />
      <BlogComments blogId={blog.id} comments={blog.comments} />
    </article>
  );
}
