"use client";

import React, { useEffect, useRef } from 'react';
import { Blog } from '@/types/blog';
import BlogContentPreview from '@/components/BlogContentPreview';

interface BlogPageClientProps {
  blog: Blog;
}

const BlogPageClient: React.FC<BlogPageClientProps> = ({ blog }) => {
  // Support both the old { html, css } format and the new { html, css, js } format
  const content = blog.content || {};
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
      {content && (
        <BlogContentPreview content={content} />
      )}
    </div>
  );
};

export default BlogPageClient;
