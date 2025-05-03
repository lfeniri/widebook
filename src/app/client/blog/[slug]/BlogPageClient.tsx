"use client";

import React from 'react';
import { Blog } from '@/types/blog';


interface BlogPageClientProps {
  blog: Blog;
}

const BlogPageClient: React.FC<BlogPageClientProps> = ({ blog }) => {
  // Le contenu est toujours un objet JSON { html, css }
  const html = blog.content?.html || '';
  const css = blog.content?.css || '';
  return (
    <div>
      <h1>{blog.title}</h1>
      {html && (
        <>
          {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </>
      )}
    </div>
  );
};

export default BlogPageClient;
