"use client";

import React from "react";
import BlogForm from '@/components/BlogForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Blog } from '@/types/blog';

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      const res = await fetch(`/admin/api/blogs/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setBlog(data);
      } else {
        router.replace('/admin/blogs');
      }
      setLoading(false);
    }
    fetchBlog();
  }, [params.id, router]);

  if (loading) return <div className="py-10 text-center">Chargement...</div>;
  if (!blog) return <div className="py-10 text-center text-red-500">Blog introuvable.</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 animate-fadeInUp">
      <h2 className="text-2xl font-bold mb-6">Éditer le blog</h2>
      <BlogForm blog={blog} />
    </div>
  );
}
