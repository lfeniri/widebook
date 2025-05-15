"use client";

import { useEffect, useState } from 'react';
import { Blog } from '@/types/blog';
import EditBlogContent from '@/components/blog/EditBlogContent';
import { notFound } from 'next/navigation';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { API_PATHS } from '@/lib/constants';

export default function BlogEditPageClient({ id }: { id: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetchWithAuth(API_PATHS.ADMIN.BLOGS.DETAIL(id));
        if (!res.ok) {
          if (res.status === 404) {
            return notFound();
          }
          throw new Error('Failed to fetch blog');
        }
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error('Error loading blog:', error);
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
