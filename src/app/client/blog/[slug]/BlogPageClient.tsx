"use client";

import React from 'react';
import { Blog } from '@/types/blog';


interface BlogPageClientProps {
  blog: Blog;
}

const BlogPageClient: React.FC<BlogPageClientProps> = ({ blog }) => {
  console.log('BlogPageClient', removeBodyTag(blog.content));
  return (
    <div>
      <h1>{blog.title}</h1>
      {blog.content && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: typeof blog.content === 'string' ? removeBodyTag(blog.content) : '' }}
        />
      )}
    </div>
  );
};

function removeBodyTag(html: string | undefined): string {
  return html?.replace(/<\/?body[^>]*>/gi, '') || '';
}

export default BlogPageClient;
