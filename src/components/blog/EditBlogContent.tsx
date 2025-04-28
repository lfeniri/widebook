"use client";

import React, { useState } from "react";
import { Blog, BlogContentBlock } from '@/types/blog';
import BlogForm from '@/components/BlogForm';
import BlogBuilderModal from '@/components/BlogBuilderModal';

export function EditBlogContent({ blog: initialBlog }: { blog: Blog }) {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [localBlog, setLocalBlog] = useState<Blog>(initialBlog);

  const handleContentConfigChange = (newConfig: BlogContentBlock[]) => {
    setLocalBlog({ ...localBlog, contentConfig: newConfig });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Modifier le blog</h2>
        <button
          onClick={() => setIsBuilderOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg shadow"
          style={{ backgroundColor: "#FF385C" }}
        >
          Ouvrir l'éditeur visuel
        </button>
      </div>
      <BlogForm blog={localBlog} />
      <BlogBuilderModal
        open={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        value={localBlog.contentConfig}
        onChange={handleContentConfigChange}
      />
    </div>
  );
}
