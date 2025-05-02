"use client";

import React from 'react';
import { Blog } from '@/types/blog';


interface BlogPageClientProps {
  blog: Blog;
}

const BlogPageClient: React.FC<BlogPageClientProps> = ({ blog }) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      {blog.contentConfig && (
        <div
          className="prose max-w-none"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: typeof blog.contentConfig === 'string' ? blog.contentConfig : '' }}
        />
      )}
    </div>
  );
};

export default BlogPageClient;
