"use client";

import React, { useState } from "react";
import { Blog } from '@/types/blog';
import BlogForm from '@/components/BlogForm';
import { useRouter } from 'next/navigation';

interface EditBlogContentProps {
  blog: Blog;
}

export default function EditBlogContent({ blog: initialBlog }: EditBlogContentProps) {
  const router = useRouter();
  const [localBlog, setLocalBlog] = useState<Blog>(initialBlog);

  if (!localBlog) return null;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Modifier le blog</h2>
        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/admin/blogs/${localBlog.id}/edit-content`)}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg shadow"
            style={{ backgroundColor: "#FF385C" }}
          >
            Ouvrir l'éditeur visuel (GrapesJS)
          </button>
        </div>
      </div>
      <BlogForm blog={localBlog} />
    </div>
  );
}
