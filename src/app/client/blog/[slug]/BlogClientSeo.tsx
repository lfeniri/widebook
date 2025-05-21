"use client";

import { Blog } from '@/types/blog';
import SeoTagsInjector from '@/components/blog/SeoTagsInjector';

interface BlogClientSeoProps {
  blog: Blog;
}

/**
 * Composant client pour injecter des balises SEO côté client
 */
const BlogClientSeo = ({ blog }: BlogClientSeoProps) => {  return (
    <SeoTagsInjector
      blog={blog}
      url={`/client/book-page/${blog.slug}`}
    />
  );
};

export default BlogClientSeo;
