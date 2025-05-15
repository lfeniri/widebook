"use client";

import { useEffect, useState } from 'react';
import { Blog } from '@/types/blog';
import EditBlogContent from '@/components/blog/EditBlogContent';
import { notFound } from 'next/navigation';
import { blogService } from '@/services/blogService';

export default function BlogEditPageClient({ id }: { id: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await blogService.getAdminBlogById(id);
        setBlog(data);
      } catch (error) {
        console.error('Error loading blog:', error);
        if ((error as Error).message === 'Blog not found') {
          return notFound();
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return <EditBlogContent blog={blog} />;
}
