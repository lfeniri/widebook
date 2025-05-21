import React from 'react';
import { Blog } from '@/types/blog';
import BlogHeader from './BlogHeader';
import SEOComponent from '@/components/seo/SEOComponent';
import EnhancedBlogSeo from '@/components/seo/EnhancedBlogSeo';
import ArticleStructuredData from '@/components/seo/ArticleStructuredData';

interface BlogPageServerProps {
  blog: Blog;
}

const BlogPageServer: React.FC<BlogPageServerProps> = ({ blog }) => {
  // Support both the old { html, css } format and the new { html, css, js } format
  const content = blog.content || {};
  const contentHtml = typeof content === 'object' && content.html || '';
  const contentCss = typeof content === 'object' && content.css || '';
  const contentJs = typeof content === 'object' && content.js || '';
  
  return (
    <article className="w-full relative">
      {/* Blog Header Component */}
      <BlogHeader blog={blog} />
      
      {/* Contenu du blog */}
      {content && (
        <div className="blog-content-container w-full">
          {/* Rendre le HTML du blog directement */}
          <div 
            className="blog-content w-full" 
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
          />
          
          {/* Injecter le CSS directement */}
          {contentCss && (
            <style dangerouslySetInnerHTML={{ __html: contentCss }} />
          )}
          
          {/* Injecter le JavaScript si présent */}
          {contentJs && (
            <script dangerouslySetInnerHTML={{ __html: contentJs }} />
          )}
        </div>
      )}      {/* SEO de base et données structurées */}      <SEOComponent 
        pageType="blog"
        blog={blog} 
        url={`/client/book-page/${blog.slug}`}
        breadcrumbItems={[
          { name: 'Accueil', item: '/' },
          { name: 'Blogs', item: '/blogs' },
          { name: blog.category?.name || 'Catégorie', item: `/blogs?category=${blog.categoryId}` },
          { name: blog.title, item: `/client/book-page/${blog.slug}` }
        ]}
      />
      
      {/* SEO avancé spécifique aux blogs */}      <EnhancedBlogSeo
        blog={blog}
        url={`/client/book-page/${blog.slug}`}
        breadcrumbItems={[
          { name: 'Accueil', item: '/' },
          { name: 'Blogs', item: '/blogs' },
          { name: blog.category?.name || 'Catégorie', item: `/blogs?category=${blog.categoryId}` },
          { name: blog.title, item: `/client/book-page/${blog.slug}` }
        ]}
      />        {/* Données structurées spécifiques pour articles */}
      <ArticleStructuredData 
        blog={blog} 
        url={`/client/book-page/${blog.slug}`} 
      />
    </article>
  );
};

export default BlogPageServer;
