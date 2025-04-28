"use client";

import React from 'react';
import { Blog } from '@/types/blog';
import { GridRenderer } from 'visual-blog-builder-lib/components/GridRenderer';
import { convertContentConfigToGrid } from '@/lib/utils';

interface BlogPageClientProps {
  blog: Blog;
}

const BlogPageClient: React.FC<BlogPageClientProps> = ({ blog }) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      {blog.contentConfig && (
        <GridRenderer grid={convertContentConfigToGrid(blog.contentConfig)} />
      )}
    </div>
  );
};

export default BlogPageClient;
