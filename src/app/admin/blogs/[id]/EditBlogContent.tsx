"use client";

import React, { useEffect, useState } from "react";
import { Blog } from '@/types/blog';
import BlogForm from '@/components/BlogForm';
import { blogService } from '@/services';

export default function EditBlogContent({ id }: { id: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [localBlog, setLocalBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id) return;
    
    async function fetchBlog() {
      try {
        const data = await blogService.getAdminBlogById(id);
        setBlog(data);
        setLocalBlog(data);
      } catch (error) {
        console.error('Error loading blog:', error);
      }
    }
    fetchBlog();
  }, [id]);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Modifier le blog</h2>
        {localBlog && (
          <button
            onClick={() => window.location.assign(`/admin/blogs/${localBlog.id}/edit-content`)}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg shadow"
            style={{ backgroundColor: "#FF385C" }}
          >
            Ouvrir l'éditeur visuel
          </button>
        )}
      </div>
      <BlogForm blog={localBlog || undefined} />
    </div>
  );
}
